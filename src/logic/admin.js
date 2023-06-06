const { logger } = require("../common/log");
const moment = require("moment");
var mongodb = require("mongodb");
const { generateToken, verifyToken } = require("../common/auth");

const login = async (request, response, pool) => {
  try {
    const { username, password } = request.body;
    const collection = pool.collection("users");
    const rows = await collection.find({ username, password }).toArray();
    if (rows && rows.length > 0) {
      return response.status(200).json({
        message: "Successfully Logged In",
        user: rows[0],
        token: generateToken(rows[0].username),
        tokenExpTime: moment()
          .add(process.env.TOKEN_EXPIRE, "m")
          .format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      return response.status(401).json({
        message: "Username or password inccorrect!",
      });
    }
  } catch (error) {
    response.status(500).send({ error: error.message });
    logger.error(`${request.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  login,
};
