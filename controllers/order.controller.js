const fs = require('fs')
const path = require('path')
const Order = require('../models/Orders')
const optionsCheckbox = require('../models/optionsCheckbox')
const Sequelize = require('../db/dbConfig')
exports.addNewOrder = (req,res)=>{
  optionsCheckbox.create()
  .then(data=>{
    Order.create({
      measurements:req.body.order.measurement,
      UserId: req.body.order.userId,
      comment: req.body.order.comment,
      SewindDateId: req.body.order.sewindId,
      optionsCheckboxId: data.id,
      adress: req.body.adress.join(', ')
    })
    .then((result)=>{
      if(result){
        fs.mkdirSync(path.resolve(__dirname, '../../studio/src/img/',result.dataValues.id.toString()),{ recursive: true })
        res.status(200).send(result.dataValues.id.toString())
      }
    })
  })
  
}
exports.updateImage = (req,res)=>{
  console.log('dsdjsdj')
  let listTitle = [];
  if(Array.isArray(req.body.listTitle)){
    listTitle = req.body.listTitle
  }
  else{
    listTitle.push(req.body.listTitle)
  }
  Order.update(
    {
      pathPhoto:listTitle
    },{where:{
      id: req.body.orderId
    }})
  .then(()=>{
    res.status(200).send('Данные успешно изменены!')
  })
}

exports.orderById = (req,res)=>{
  Order.findAll({
    where:{
      UserId: req.body.userId
    },
    order:[['id','DESC']]
  },  
)
  .then((result)=>{
    res.status(200).send(result)
  })
}

exports.getAll = (req,res)=>{
  Sequelize.query(
    'SELECT "Orders".*, "Users"."firstName", "Users"."lastName", "Orders"."adress", "Users"."number", To_char("SewindDates".date,'+ "'DD.MM.YYYY'"+') AS date FROM public."Users", public."Orders", public."SewindDates" WHERE "Orders"."UserId" = "Users".id AND "Orders"."SewindDateId" = "SewindDates".id',
    { type: Sequelize.QueryTypes.SELECT}
  )
  .then(result=>res.status(200).send(result))
}