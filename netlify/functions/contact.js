// netlify/functions/contact.js

const { MongoClient, ObjectId } = require("mongodb");

let client;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not set in Netlify");
  }

  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
  }

  return client.db("travel");
};

exports.handler = async (event) => {
  try {
    const db = await connectDB();

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
    // ✅ 2. GET CONTACT(S)
    // =========================
    if (event.httpMethod === "GET") {
      const id = event.queryStringParameters?.id;

      // 👉 Get single contact
      if (id) {
        if (!ObjectId.isValid(id)) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid ID" }),
          };
        }

        const contact = await db.collection("contacts").findOne({
          _id: new ObjectId(id),
        });

        if (!contact) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: "Contact not found" }),
          };
        }

        return {
          statusCode: 200,
          body: JSON.stringify(contact),
        };
      }

      // 👉 Get all contacts
      const contacts = await db
        .collection("contacts")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        body: JSON.stringify(contacts || []),
      };
    }

    // =========================
    // ✅ 3. DELETE CONTACT
    // =========================
    if (event.httpMethod === "DELETE") {
      const id = event.queryStringParameters?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "ID required" }),
        };
      }

      if (!ObjectId.isValid(id)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Invalid ID" }),
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

    // =========================
    // ❌ METHOD NOT ALLOWED
    // =========================
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };

  } catch (err) {
    console.error("CONTACT ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};