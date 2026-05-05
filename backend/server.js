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

/* ================= ✅ FIXED CORS ================= */
app.use(
  cors({
    origin: "https://amolsathe-react.netlify.app", // ❌ removed trailing /
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ✅ IMPORTANT: HANDLE PREFLIGHT */
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://amolsathe-react.netlify.app"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

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

/* ================= AUTH ================= */
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= SUBSCRIBE ================= */
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.json({ message: "Enter valid email" });

    const exists = await Subscriber.findOne({ email });
    if (exists) return res.json({ message: "Email already exists" });

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
    console.log(err);
    res.json({ message: "Error" });
  }
});

/* ================= CONTACT ================= */
app.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newContact = new Contact({
      name,
      email,
      phone,
      message,
    });

    await newContact.save();

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Contact error" });
  }
});

/* ================= GET CONTACTS ================= */
app.get("/contacts", verifyAdmin, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

/* ================= DELETE CONTACT ================= */
app.delete("/contact/:id", verifyAdmin, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ================= GET SUBSCRIBERS ================= */
app.get("/subscribers", verifyAdmin, async (req, res) => {
  const users = await Subscriber.find().sort({ createdAt: -1 });
  res.json(users);
});

/* ================= DELETE SUBSCRIBER ================= */
app.delete("/delete/:id", verifyAdmin, async (req, res) => {
  await Subscriber.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

/* ================= EXPORT ================= */
app.get("/export", verifyAdmin, async (req, res) => {
  const users = await Subscriber.find();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Subscribers");

  sheet.columns = [{ header: "Email", key: "email", width: 30 }];
  users.forEach((u) => sheet.addRow({ email: u.email }));

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
});

/* ================= TEMPLATES ================= */
app.get("/templates", verifyAdmin, (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, "templates"));

  const templates = files
    .filter((file) => file.endsWith(".js"))
    .map((file) => file.replace(".js", ""));

  res.json(templates);
});

/* ================= SEND TEMPLATE ================= */
app.post("/send-template", verifyAdmin, async (req, res) => {
  const { templateName } = req.body;

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
});

/* ================= REPLY ================= */
app.post("/reply", async (req, res) => {
  const { email, message } = req.body;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reply from Support Team",
    html: `<p>${message}</p>`,
  });

  res.json({ message: "Reply sent successfully" });
});

/* ================= HOME ================= */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* ================= START ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});