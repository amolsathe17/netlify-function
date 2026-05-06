const { MongoClient, ObjectId } = require("mongodb");

let client;

exports.handler = async (event) => {
  try {
    // 🔐 Check MongoDB URI
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in Netlify");
    }

    // 🔌 Connect DB (reuse connection)
    if (!client) {
      client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
    }

    const db = client.db("travel");

    // =========================
    // ✅ 1. SAVE CONTACT (POST)
    // =========================
    if (event.httpMethod === "POST") {
      let body;

      try {
        body = JSON.parse(event.body);
      } catch {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid JSON" }),
        };
      }

      const { name, email, message } = body;

      if (!name || !email || !message) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "All fields required" }),
        };
      }

      await db.collection("contacts").insertOne({
        name,
        email,
        message,
        important: false,
        replied: false,
        createdAt: new Date(),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Message saved" }),
      };
    }

    // =========================
    // ✅ 2. DELETE CONTACT
    // =========================
    if (event.httpMethod === "DELETE") {
      const id = event.queryStringParameters.id;

      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "ID required" }),
        };
      }

      await db.collection("contacts").deleteOne({
        _id: new ObjectId(id),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Deleted" }),
      };
    }

    return {
      statusCode: 405,
      body: "Method not allowed",
    };
  } catch (err) {
    console.error("CONTACT ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};