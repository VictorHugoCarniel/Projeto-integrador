const routes =  require('express').Router();
const multer = require('multer')
const multerConfig = require('./config/multer')

routes.post("/posts", multer(multerConfig).single('file'), (req, res) => {
    console.log(req.file);
    
    return res.send("Hello Bitches")
});



module.exports = routes;
