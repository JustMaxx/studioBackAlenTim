const controller = require("../controllers/user.controller");


module.exports = function (app) {
  app.post("/api/user/getUserData", controller.getUserData)
};
