
const nodemailer = require("nodemailer");

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
    const BASE_URL = "https://amolsathe-function.netlify.app/";

    // ✅ Fetch HTML template from public folder
    const htmlContent = await fetch(
      `${BASE_URL}/templates/${templateName}`
    ).then((res) => res.text());

    // ✅ Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🚀 Send emails
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