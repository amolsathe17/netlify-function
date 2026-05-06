const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  let client;

  try {
    // ✅ 1. Get selected template name
    const { templateName } = JSON.parse(event.body);

    if (!templateName) {
      throw new Error("No template selected");
    }

    console.log("Selected template:", templateName);

    // ✅ 2. FIXED PATH (important)
const filePath = path.resolve(
  process.cwd(),
  "netlify/functions/templates",
  templateName
);

    console.log("Template path:", filePath);

    // ✅ 3. Check file exists
    if (!fs.existsSync(filePath)) {
      throw new Error("Template file not found");
    }

    // ✅ 4. Read HTML content
    const htmlContent = fs.readFileSync(filePath, "utf-8");

    // ✅ 5. Connect MongoDB
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();

    const users = await client
      .db("yourDB") // 🔁 change if needed
      .collection("subscribers")
      .find({})
      .toArray();

    console.log("Total subscribers:", users.length);

    if (!users.length) {
      throw new Error("No subscribers found");
    }

    // ✅ 6. Setup mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // ✅ 7. Send email to all users
    for (let user of users) {
      if (!user.email) continue;

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: user.email,
        subject: "Special Offer 🎉",
        html: htmlContent,
      });

      console.log("Sent to:", user.email);
    }

    // ✅ 8. Close DB
    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Templates sent successfully 🚀",
      }),
    };
  } catch (err) {
    console.error("ERROR:", err.message);

    if (client) await client.close();

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};