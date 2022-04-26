const User = require("../models/User");
const config = require("../config/jwt.config")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

exports.registration = (req, res) => {
  let person = req.body

  User.create({
    firstName: person.firstName,
    lastName: person.lastName,
    password: bcrypt.hashSync(person.password, 8),
    email: person.email,
    number: person.number,
    idRole: 1,
  })
    .then(() =>{
      console.log("successful")      
      res.status(200).send('Пользователь успешно зарегистрирован!')
  })
    .catch((e) =>{console.log(e)});
};

exports.signin = (req, res) =>{
  User.findOne(
    {
      where:{
        email: req.body.email
      }    
    }
  )
  .then(user=>{
    if(!user){
      return res.status(404).send({message:'Пользователь не найден'})
    }
    console.log(req.body)
    var passValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Неправильный пароль!",
      });
    }
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });

    res.status(200).send({
      id: user.id,
      accessToken: token,
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
}

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(req.headers)
  if (!token) {
    return res.status(403).send({
      message: "Токена не существует",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Не авторизован!",
      });
    }
    else{
      return res.status(200).send({
        message: "Пользователь авторизован!"
      })
    }
    
  });
};