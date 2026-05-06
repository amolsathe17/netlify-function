const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const templatesDir = path.resolve(
      process.cwd(),
      "netlify/functions/templates"
    );

    console.log("PATH:", templatesDir);

    if (!fs.existsSync(templatesDir)) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Folder NOT found",
          path: templatesDir,
        }),
      };
    }

    const files = fs.readdirSync(templatesDir);

    const htmlFiles = files.filter((f) =>
      f.toLowerCase().endsWith(".html")
    );
console.log("Templates function hit");
    return {
      statusCode: 200,
      body: JSON.stringify(htmlFiles),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};