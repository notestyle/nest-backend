const { MongoClient } = require("mongodb");

async function createConnection() {
  const connection = new MongoClient(process.env.MONGO_CONNECTION_URL);
  await connection.connect();
  return connection;
}

module.exports = { createConnection };
