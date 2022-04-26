const User = require("../models/User");

module.exports = checkEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      console.log("error");
      res.status(400).send('Такой email уже используется!')
      return
    }
    next();
  });
};
