// netlify/functions/templates.js

exports.handler = async () => {
  try {
    // 🔴 IMPORTANT: replace with your real domain
    const BASE_URL = "https://amolsathe-function.netlify.app/"; 

    // 👉 List your template files here
    const templateFiles = [
      "offer.html",
      "offer1.html",
      "Diwali.html"
    ];

    const validTemplates = [];

    // ✅ Check which templates actually exist
    for (let file of templateFiles) {
      try {
        const res = await fetch(`${BASE_URL}/templates/${file}`);
        if (res.ok) {
          validTemplates.push(file);
        }
      } catch (err) {
        console.log("Error checking file:", file);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(validTemplates),
    };

  } catch (err) {
    console.error("TEMPLATES ERROR:", err);

    return {
      statusCode: 200,
      body: JSON.stringify([]),
    };
  }
};