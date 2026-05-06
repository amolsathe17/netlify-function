 const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
exports.handler = async (event) => {
 
 try {
 const data = JSON.parse(event.body);
 await client.connect();
 const db = client.db("travel"); // change DB name if needed
 await db.collection("contacts").insertOne(data);
 return {
 statusCode: 200,
 body: JSON.stringify({ message: "Saved" }),
 };
 } catch (error) {
 return {
 statusCode: 500,
 body: JSON.stringify({ error: error.message }),
 };
 }
};