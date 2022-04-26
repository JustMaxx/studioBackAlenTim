const SewindDate = require('../models/SewindDate');
const Order = require('../models/Orders')
const Sequelize = require('../db/dbConfig');

exports.getDates = (req,res)=>{
  SewindDate.findAll()
  .then(data=>res.status(200).send(data))
}

exports.addDate = (req,res)=>{
  SewindDate.create({
    date: req.body.date,
    limit: req.body.limit
  })
  .then(data=>res.status(200).send("Дата добавлена!"))
}
exports.removeDate = (req,res)=>{
  SewindDate.destroy({
    where:{
      id:req.body.id
    }
  })
  .then(()=>res.status(200).send("Дата успешно удалена!"))
}

exports.getAvlDates = (req,res)=>{
  Sequelize.query('SELECT DISTINCT  "SewindDates".id, To_char("SewindDates".date,'+ "'DD.MM.YYYY'"+') AS Date FROM public."SewindDates" WHERE "SewindDates".id NOT IN (SELECT  MAX("SewindDateId") AS sewindId  FROM public."Orders", public."SewindDates"  WHERE "Orders"."SewindDateId" = "SewindDates".id GROUP BY "SewindDateId"  HAVING COUNT("SewindDateId") >= MAX("SewindDates".limit))',
  { type: Sequelize.QueryTypes.SELECT})
  .then(result=>res.status(200).send(result))
}