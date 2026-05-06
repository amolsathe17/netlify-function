const { MongoClient } = require("mongodb");

let client;

exports.handler = async () => {
  try {
    if (!client) {
      client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
    }

    const db = client.db("travel");

    const users = await db.collection("subscribers").find({}).toArray();

    const csv =
      "Email\n" + users.map((u) => u.email).join("\n");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=subscribers.csv",
      },
      body: csv,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};