require("dotenv").config();
var jwt = require("jsonwebtoken");
const { logger } = require("./log");

const generateToken = (decoded) => {
  let token = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRE,
  });
  return token;
};

const checkAuthentication = async (req) => {
  var token = req.headers.token;
  if (!token) {
    throw new Error("Unautorization!");
  }
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    throw new Error("TOKEN_EXPIRED");
  }

  token = await generateToken(decoded);
  return token;
};

const isAuth = async (req, res, next) => {
  try {
    req.token = await checkAuthentication(req);
    next();
  } catch (error) {
    res.status(401).send({ error: error.message });
    logger.error(`${req.ip} ${error.message}`);
    return;
  }
};

module.exports = {
  generateToken,
  checkAuthentication,
  isAuth,
};
