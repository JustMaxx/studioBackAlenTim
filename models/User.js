const Sequelize = require("sequelize");
const db = require("../db/dbConfig");
const Orders = require("../models/Orders");

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    adress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    social: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    idRole: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idSizes: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Orders);

module.exports = User;
