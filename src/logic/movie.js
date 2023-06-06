const { logger } = require("../common/log");
var mongodb = require("mongodb");

const getMovie = async (request, response, pool) => {
  try {
    const collection = pool.collection("movies");
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

const insertMovie = async (request, response, pool) => {
  try {
    const collection = pool.collection("movies");
    await collection.insertOne(request.body);
    return response
      .status(200)
      .json({ message: "success", token: request.token });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const deleteMovie = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("movies");
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

const updateMovie = async (request, response, pool) => {
  try {
    const { _id } = request.body;
    const collection = pool.collection("movies");

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
  getMovie,
  deleteMovie,
  insertMovie,
  updateMovie,
};
