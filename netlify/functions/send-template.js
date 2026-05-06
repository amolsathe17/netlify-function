const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const { templateName, subscribers } = JSON.parse(event.body);

    if (!templateName || !subscribers) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing data" }),
      };
    }

    // =========================
    // 📄 Load HTML template
    // =========================
    const templatePath = path.join(
      __dirname,
      "../../public/templates",
      templateName
    );

    if (!fs.existsSync(templatePath)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Template not found" }),
      };
    }

    const htmlContent = fs.readFileSync(templatePath, "utf-8");

    // =========================
    // 📧 Gmail transporter
    // =========================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // =========================
    // 🚀 Send emails
    // =========================
    for (let user of subscribers) {
      if (!user.email) continue;

      await transporter.sendMail({
        from: `"Travel Offers ✈️" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Exclusive Travel Offer 🌍",
        html: htmlContent,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Emails sent successfully" }),
    };

  } catch (err) {
    console.error("SEND TEMPLATE ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};