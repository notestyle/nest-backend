const { logger } = require("../common/log");

const getUsers = async (request, response, pool) => {
  try {
    const result = ["Mongo"];
    return response.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

const insertUser = async (request, response, pool) => {
  try {
    const result = ["Mongo"];
    return response.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  getUsers,
};