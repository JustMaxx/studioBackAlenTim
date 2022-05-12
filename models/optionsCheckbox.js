const Sequelize = require("sequelize");
const db = require("../db/dbConfig");
const Orders = require("./Orders");

// Sketch
//  measurements
//  materials
//  Pattern
//  cutting
//  painting
//  Applications
//  Rhinestones
//  Sewing
//  Payment

const optionsCheckbox = db.define(
  "optionsCheckbox",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sketch: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    measurement: {
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
    cutting: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    painting: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    applications: {
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
    payment: {
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
