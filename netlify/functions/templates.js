// netlify/functions/templates.js

const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    // ✅ Correct path for Netlify
    const templatesDir = path.join(__dirname, "../../public/templates");

    console.log("Reading templates from:", templatesDir);

    // If folder missing → return empty array (NOT error)
    if (!fs.existsSync(templatesDir)) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    // Read all files
    const files = fs.readdirSync(templatesDir);

    // Filter only HTML files
    const htmlFiles = files.filter((file) =>
      file.toLowerCase().endsWith(".html")
    );

    // Optional: sort alphabetically
    htmlFiles.sort();

    return {
      statusCode: 200,
      body: JSON.stringify(htmlFiles), // ✅ ALWAYS array
    };

  } catch (err) {
    console.error("TEMPLATES ERROR:", err);

    return {
      statusCode: 200, // ✅ still return array to prevent frontend crash
      body: JSON.stringify([]),
    };
  }
};