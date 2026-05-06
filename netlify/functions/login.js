const { MongoClient } = require("mongodb");

let client;

exports.handler = async (event) => {
  try {
    // Only POST allowed
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing fields" }),
      };
    }

    // 🔥 SIMPLE ADMIN LOGIN (works instantly)
    if (username === "admin" && password === "1234") {
      return {
        statusCode: 200,
        body: JSON.stringify({ token: "admin123" }),
      };
    }

    // OPTIONAL: MongoDB check (if you want DB login)
    if (process.env.MONGO_URI) {
      if (!client) {
        client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
      }

      const db = client.db("travel");

      const user = await db.collection("users").findOne({ username });

      if (user && user.password === password) {
        return {
          statusCode: 200,
          body: JSON.stringify({ token: "admin123" }),
        };
      }
    }

    // ❌ If nothing matched
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid username or password" }),
    };
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};