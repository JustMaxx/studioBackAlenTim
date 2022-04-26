const Sequelize = require("sequelize");
const db = require("../db/dbConfig");
const Orders = require("./Orders");

const optionsCheckbox = db.define(
  "optionsCheckbox",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sizes: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    materials: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    pattern: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    applique: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    rhinestones: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sewing: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }

);

optionsCheckbox.hasOne(Orders)

module.exports = optionsCheckbox;
