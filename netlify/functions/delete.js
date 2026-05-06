const { MongoClient, ObjectId } = require("mongodb");

let client;

exports.handler = async (event) => {
  try {
    const id = event.queryStringParameters.id;

    if (!client) {
      client = new MongoClient(process.env.MONGO_URI);
      await client.connect();
    }

    const db = client.db("travel");

    await db.collection("subscribers").deleteOne({
      _id: new ObjectId(id),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Deleted subscriber" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};