// const { getUsers } = require("../logic/admin");
const { getUsers, insertUser } = require("../logic/admin_mongo");
const { logger } = require("../common/log");

module.exports = function (app, connection) {
  // GET, POST - (login, create), PUT - update, DELETE - delete
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

  app.post("/api/user", async (req, res) => {
    try {
      logger.info(`${req.ip} /user [post]`);
      insertUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
