const Sequelize = require('sequelize');
const db = require('./db');


const ImgProd = db.sequelize.define('imgprod', {
    idImgProd:{
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNUll: true
    },
    name:{
        type: db.Sequelize.STRING,
        allowNUll: true
    },
    size: db.Sequelize.FLOAT,
    key: db.Sequelize.STRING,
    url: db.Sequelize.STRING
});

// ImgProd.sync({ force: true })

module.exports = ImgProd;
