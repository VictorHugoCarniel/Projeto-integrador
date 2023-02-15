const Sequelize = require('sequelize');
const db = require('./db');


const ImgProd = db.sequelize.define('improd', {
    name:{
        type: db.Sequelize.STRING,
        primaryKey: true,
        allowNUll: true
    },
    size: db.Sequelize.FLOAT,
    key: db.Sequelize.STRING,
    url: db.Sequelize.STRING
});

ImgProd.sync({ force: true })
module.exports = ImgProd;
