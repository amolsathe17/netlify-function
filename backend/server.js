require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const ExcelJS = require("exceljs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");

// MODELS
const Subscriber = require("./models/Subscriber");
const Contact = require("./models/Contact");
const offerEmailTemplate = require("./templates/offerEmail");

const app = express();

/* ================= SECURITY ================= */
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use(cors({
  origin: ["https://amolsathe-react.netlify.app"]
}));
app.use(express.json());

/* ================= ENV CHECK ================= */
if (!process.env.JWT_SECRET) {
  console.log("❌ JWT_SECRET missing in .env");
}

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

/* ================= EMAIL SETUP ================= */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= ADMIN LOGIN ================= */
app.post("/admin/login", (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
      const token = jwt.sign(
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({ token });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login error" });
  }
});

/* ================= AUTH MIDDLEWARE ================= */
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

/* ================= SUBSCRIBE ================= */
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return res.json({ message: "Enter valid email" });
    }

    const newUser = new Subscriber({ email });
    await newUser.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "🌍 Welcome",
      html: "<h2>Thanks for subscribing!</h2>",
    });

    res.json({ message: "Subscribed & Email Sent" });

  } catch (err) {
    if (err.code === 11000) {
      return res.json({ message: "Email already exists" });
    }
    console.log(err);
    res.json({ message: "Error" });
  }
});

/* ================= CONTACT FORM ================= */
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "📩 new inquiry",
      html: `
        <h2>new inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ We received your message",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting us.</p>
        <p>We will respond shortly.</p>
        <br/>
        <p>Regards,<br/>Team</p>
      `,
    });

    res.json({ message: "Message sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Contact error" });
  }
});

/* ================= GET CONTACTS ================= */
app.get("/contacts", verifyAdmin, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

/* ================= 🔥 FIX ADDED: DELETE CONTACT ================= */
app.delete("/contact/:id", verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    return res.json({
      message: "Contact deleted successfully",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Error deleting contact",
    });
  }
});

/* ================= GET SUBSCRIBERS ================= */
app.get("/subscribers", verifyAdmin, async (req, res) => {
  try {
    const users = await Subscriber.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

/* ================= DELETE SUBSCRIBER ================= */
app.delete("/delete/:id", verifyAdmin, async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete error" });
  }
});

/* ================= EXPORT ================= */
app.get("/export", verifyAdmin, async (req, res) => {
  try {
    const users = await Subscriber.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Subscribers");

    worksheet.columns = [{ header: "Email", key: "email", width: 30 }];

    users.forEach((u) => worksheet.addRow({ email: u.email }));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=subscribers.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    res.status(500).send("Export failed");
  }
});

/* ================= LIST TEMPLATES ================= */
app.get("/templates", verifyAdmin, (req, res) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, "templates"));

    const templates = files
      .filter((file) => file.endsWith(".js"))
      .map((file) => file.replace(".js", ""));

    res.json(templates);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error loading templates" });
  }
});

/* ================= SEND TEMPLATE ================= */
app.post("/send-template", verifyAdmin, async (req, res) => {
  try {
    const { templateName } = req.body;

    if (!templateName) {
      return res.status(400).json({ message: "Template required" });
    }

    const template = require(`./templates/${templateName}`);
    const users = await Subscriber.find();

    for (let user of users) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "🔥 Newsletter",
        html: template(user.email),
      });
    }

    res.json({ message: "Template sent successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error sending template" });
  }
});

/* ================= DEFAULT OFFER ================= */
app.get("/send-offer", verifyAdmin, async (req, res) => {
  try {
    const users = await Subscriber.find();

    for (let user of users) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "🔥 Travel Offer",
        html: offerEmailTemplate(user.email),
      });
    }

    res.send("Emails sent successfully ✅");

  } catch (err) {
    console.log(err);
    res.status(500).send("Error sending emails ❌");
  }
});

/* ================= REPLY TO CONTACT ================= */
app.post("/reply", async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reply from Support Team",
      html: `
        <p>${message}</p>
        <br/>
        <p>Regards,<br/>Team</p>
      `,
    });

    res.json({ message: "Reply sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Reply error" });
  }
});

/* ================= HOME ================= */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});