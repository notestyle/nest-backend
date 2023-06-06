const { isAuth } = require("../common/auth");
const { logger } = require("../common/log");

// postgresql сонгосон бол доорх мөрийн uncomment
// const {
//   getUsers,
//   insertUser,
//   updateUser,
//   deleteUser,
//   login,
// } = require("../logic/admin");

// mongodb сонгосон бол доорх мөрийн uncomment
const { login } = require("../logic/admin");

module.exports = function (app, connection) {
  /**
   * GET - Жагсаалт авах, ямар нэг дата харахад ашиглана => app.get()
   * POST - Login, Create дээр ашиглана => app.post()
   * PUT - Update буюу дата засахад ашиглана => app.put()
   * DELETE - Устгахад ашиглана => app.delete()
   */

  app.post("/api/login", async (req, res) => {
    try {
      logger.info(`${req.ip} /api/login [POST]`);

      login(req, res, connection);
    } catch (err) {
      logger.error(`${req.ip} ${err}`);
      res.status(500).json({ error: err.message });
    }
  });
};
