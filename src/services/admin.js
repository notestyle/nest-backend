const { getUsers } = require("../logic/admin");

module.exports = function (app, connection) {
  // postgresql
  app.get("/api/user", async (req, res) => {
    try {
      logger.info(`${req.ip} /user [get]`);
      getUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
