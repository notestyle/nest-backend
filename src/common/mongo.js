const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_CONNECTION_URL);
