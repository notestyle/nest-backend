const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

const {
  getUsers,
  insertUser,
  deleteUser,
  updateUser,
} = require("../logic/user");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  // endpoints
  app.get("/api/user", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /user [get]`);

      getUsers(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/user", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /user [post]`);
      insertUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/user", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /user [put]`);
      updateUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/user", isAuth, async (req, res) => {
    try {
      logger.info(`${req.ip} /user [delete]`);
      deleteUser(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
