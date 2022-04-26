const controller = require('../controllers/sewind.controller')

module.exports = function (app) {
  app.post('/api/sewind/getDates', controller.getDates)
  app.post('/api/sewind/addDate', controller.addDate)
  app.post('/api/sewind/removeDate', controller.removeDate)
  app.post('/api/sewind/getAvlDates', controller.getAvlDates)
}