const Sequelize = require("sequelize");
const db = require("../db/dbConfig");

const Orders = db.define(
  "Orders",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName:{
      type: Sequelize.STRING,
      allowNull:true,
    },
    lastName:{
      type: Sequelize.STRING,
      allowNull:true,
    },
    number:{
      type: Sequelize.STRING,
      allowNull:true,
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    adress:{
      type: Sequelize.STRING,
      allowNull: true,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    prepayment: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    pathPhoto: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    pathSketch: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    measurements:{
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
  },
  {
    timestamps: false,
  }
);

module.exports = Orders;
