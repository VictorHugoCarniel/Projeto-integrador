const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // cb(null, 'C:/Users/douglas.8998/Documents/GitHub/Projeto-integrador/public/upload')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)  
        }
    }),
    fileFilter: (req, file, cb) => {
        const extensaoImg = ['image/png', 'image/jpg', 'image/jpeg'].find(formatoAceito => formatoAceito == file.mimetype);

        if(extensaoImg){
            return cb(null, true);
        }

        return cb(null, false);
    }
}));