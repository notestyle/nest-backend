const { getUsers, insertUser } = require("../logic/admin_mongo");

module.exports = function (app, connection) {
  app.get("/api/mongo/user", async (req, res) => {
    try {
      logger.info(`${req.ip} /mongo/user [get]`);
      getUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/mongo/user", async (req, res) => {
    try {
      logger.info(`${req.ip} /mongo/user [post]`);
      insertUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
