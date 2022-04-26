const User = require("../models/User");
const config = require("../config/jwt.config")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

exports.getUserData = (req, res) => {
  const decoded = jwt.verify(req.body.token, config.secret)
  User.findOne({
    //attributes:[],
    where:{
      id:decoded.id
    }
  })
  .then(user=>{
    res.status(200).send(user)
  })
}