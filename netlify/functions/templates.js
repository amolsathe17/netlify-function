const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    // Correct path → inside deployed bundle
    const templatesDir = path.join(__dirname, "../../public/templates");

    console.log("Templates Dir:", templatesDir);

    // Check if folder exists
    if (!fs.existsSync(templatesDir)) {
      return {
        statusCode: 200,
        body: JSON.stringify([]), // ✅ return empty array instead of error
      };
    }

    // Read files
    const files = fs.readdirSync(templatesDir);

    // Filter only .html files
    const htmlFiles = files.filter((file) =>
      file.toLowerCase().endsWith(".html")
    );

    return {
      statusCode: 200,
      body: JSON.stringify(htmlFiles), // ✅ always array
    };

  } catch (err) {
    console.error("Templates Error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};