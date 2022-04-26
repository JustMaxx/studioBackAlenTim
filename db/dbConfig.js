const Sequelize = require("sequelize");
module.exports = new Sequelize("test", "postgres", "12345", {
  dialect: "postgres",
  host: "localhost",
  port: "5432",
});
