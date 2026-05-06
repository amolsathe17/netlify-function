const nodemailer = require("nodemailer");
const fetch = require("node-fetch"); // ✅ required for Netlify

exports.handler = async (event) => {
  try {
    const { templateName, subscribers } = JSON.parse(event.body);

    if (!templateName || !subscribers) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing data" }),
      };
    }

    // 🔴 IMPORTANT: Replace with your domain
    const BASE_URL = "https://amolsathe-function.netlify.app";

    // ✅ Fetch HTML template from public folder
    const response = await fetch(`${BASE_URL}/templates/${templateName}`);

    if (!response.ok) {
      throw new Error("Template not found or failed to load");
    }

    const htmlContent = await response.text();

    // ✅ Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Verify transporter connection
    await transporter.verify();

    // 🚀 Send emails
    for (let user of subscribers) {
      if (!user.email) continue;

      try {
        await transporter.sendMail({
          from: `"Travel Offers ✈️" <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: "Exclusive Travel Offer 🌍",
          html: htmlContent,
        });

        console.log("Email sent to:", user.email);
      } catch (mailErr) {
        console.error("Error sending to:", user.email, mailErr);
      }
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