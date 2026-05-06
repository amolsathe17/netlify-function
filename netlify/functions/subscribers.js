const { MongoClient, ObjectId } = require("mongodb");

let client;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI not set");
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
    // GET ALL SUBSCRIBERS
    // =========================
    if (event.httpMethod === "GET") {
      const users = await db
        .collection("subscribers")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

      return {
        statusCode: 200,
        body: JSON.stringify(users || []),
      };
    }

    // =========================
    // DELETE SUBSCRIBER ✅
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

      const result = await db.collection("subscribers").deleteOne({
        _id: new ObjectId(id),
      });

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Subscriber deleted",
          deletedCount: result.deletedCount,
        }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };

  } catch (err) {
    console.error("SUBSCRIBER ERROR:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};