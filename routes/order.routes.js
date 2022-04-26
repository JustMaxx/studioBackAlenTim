const controller = require('../controllers/order.controller')
const uploadImage = require('../middleware/uploadImage')


module.exports = function (app){
  app.post('/api/order/addNewOrder',controller.addNewOrder)
  app.post('/api/order/uploadImage',uploadImage.array('images'), controller.updateImage)
  app.post('/api/order/orderById', controller.orderById)
  app.post('/api/order/getAll', controller.getAll)
}