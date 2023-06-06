const { logger } = require("../common/log");
var mongodb = require("mongodb");

const getUsers = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");
    const rows = await collection.find({}).toArray();
    return response.status(200).json({
      data: rows,
      token: request.token,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const insertUser = async (request, response, pool) => {
  try {
    const collection = pool.collection("users");

    await collection.insertOne({
      username: request.body.username,
      password: request.body.password,
    });
    return response
      .status(200)
      .json({ message: "success", token: request.token });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const deleteUser = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("users");
    const deleteResult = await collection.deleteOne({
      _id: new mongodb.ObjectID(_id),
    });
    logger.info(`Deleted documents id:${_id} => ${deleteResult.deletedCount}`);
    return response
      .status(200)
      .json({ message: "success", token: request.token });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const updateUser = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("users");

    // body._id -г update дээр дамжуулж болохгүй, хасаж дамжуулах ёстой
    delete request.body._id;

    await collection.updateOne(
      { _id: new mongodb.ObjectID(_id) },
      { $set: request.body }
    );
    return response
      .status(200)
      .json({ message: "success", token: request.token });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  getUsers,
  insertUser,
  updateUser,
  deleteUser,
};
