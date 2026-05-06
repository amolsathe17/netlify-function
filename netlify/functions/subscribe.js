const { MongoClient } = require("mongodb");

let client;

exports.handler = async (event) => {
  try {
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed",
      };
    }

    // Parse request safely
    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid JSON" }),
      };
    }

    const { email } = body;

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
      };
    }

    // 🔴 Check env variable
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in Netlify");
    }

    // Connect MongoDB
    if (!client) {
      client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
    }

    const db = client.db("travel");

    // Prevent duplicate emails
    const existing = await db
      .collection("subscribers")
      .findOne({ email });

    if (existing) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Already subscribed" }),
      };
    }

    // Save email
    await db.collection("subscribers").insertOne({
      email,
      createdAt: new Date(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscribed successfully" }),
    };
  } catch (error) {
    console.error("SUBSCRIBE ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message || "Server error",
      }),
    };
  }
};