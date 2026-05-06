const { MongoClient } = require("mongodb");

let client;

exports.handler = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set");
    }

    if (!client) {
      client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
    }

    const db = client.db("travel");

    const contacts = await db
      .collection("contacts")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(contacts),
    };
  } catch (err) {
    console.error("FETCH CONTACTS ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};