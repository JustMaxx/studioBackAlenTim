const controller = require("../controllers/auth.controller");
const checkEmail = require("../middleware/checkEmail");

module.exports = function (app) {
  app.post("/api/auth/registration", checkEmail, controller.registration);
  app.post("/api/auth/signin", controller.signin)
  app.post("/api/auth/verifyToken", controller.verifyToken)
};
