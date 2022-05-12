const multer = require('multer')
const fs = require('fs')
const path = require('path')


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		console.log(file)
		cb(null, path.resolve(__dirname, `../../studio/src/img/${req.body.orderId}/`));
	},
	filename: (req, file, cb) => {
		console.log(file)
		cb(null, file.originalname);
	}
});
const upload = multer({storage: storage});

module.exports = upload