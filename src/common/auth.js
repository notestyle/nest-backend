var jwt = require("jsonwebtoken");

const generateToken = (username) => {
  return jwt.sign(
    {
      username,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: `${process.env.TOKEN_EXPIRE_MINUTE}m` }
  );
};

const verifyToken = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return generateToken(decoded.username);
  } catch (err) {
    throw Error("Token expired");
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
