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

exports.addNewOrderByAdmin = (req,res)=>{
  optionsCheckbox.create()
  .then(data=>{
    Order.create({
      firstName: req.body.order.firstName,
      lastName: req.body.order.lastName,
      measurements:req.body.order.measurements,
      number:req.body.order.number,
      comment: req.body.order.comment,
      SewindDateId: req.body.order.dateId,
      optionsCheckboxId: data.id,
      adress: req.body.adress
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

exports.updateImageByAdmin = (req,res)=>{
  let listUserTitle = [];
  let listAdminTitle = [];
  if(Array.isArray(req.body.listUserTitle)){
    listUserTitle = req.body.listUserTitle
  }
  else{
    listUserTitle.push(req.body.listUserTitle)
  }
  if(Array.isArray(req.body.listAdminTitle)){
    listAdminTitle = req.body.listAdminTitle
  }
  else{
    listAdminTitle.push(req.body.listAdminTitle)
  }
  Order.update(
    {
      pathPhoto:listUserTitle,
      pathSketch:listAdminTitle
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
    ' SELECT DISTINCT "Orders".id AS "orderId", "Users"."firstName", "Users"."lastName", "Users"."number", "Orders".status, "Orders".adress, "Orders"."comment", "Orders"."prepayment", "Orders"."pathPhoto", "Orders"."pathSketch","Orders"."measurements", "Orders"."UserId", "Orders"."optionsCheckboxId", "Orders"."SewindDateId", To_char("SewindDates".date,'+ "'DD.MM.YYYY'"+') AS date, "optionsCheckboxes".* FROM public."Users", public."Orders", public."SewindDates", public."optionsCheckboxes" WHERE "Orders"."UserId" = "Users".id AND "Orders"."SewindDateId" = "SewindDates".id AND "Orders"."optionsCheckboxId" = "optionsCheckboxes".id UNION ALL SELECT DISTINCT "Orders".*, To_char("SewindDates".date,'+ "'DD.MM.YYYY'"+') AS date, "optionsCheckboxes".*   FROM public."Users", public."Orders", public."SewindDates", public."optionsCheckboxes" WHERE "Orders"."UserId" IS NULL AND "Orders"."SewindDateId" = "SewindDates".id AND "Orders"."optionsCheckboxId" = "optionsCheckboxes".id ',
    { type: Sequelize.QueryTypes.SELECT}
  )
  .then(result=>res.status(200).send(result))
}