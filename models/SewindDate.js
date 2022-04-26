const Sequelize = require("sequelize");
const db = require("../db/dbConfig");
const Orders = require("../models/Orders")
const moment = require('moment')

const SewindDate = db.define(
  "SewindDate",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      get(){
        return moment(this.getDataValue('date')).format('DD.MM.YYYY')
      }
    },
    limit:{
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false,
  }
);

SewindDate.hasMany(Orders)
module.exports = SewindDate;
