
const Sequelize = require('sequelize');
const configDB = require('../config/config');

const User = require('../models/User')

const connection = new Sequelize(configDB)

User.init(connection)

module.exports = connection

// // -------------------------------------------

// const express = require("express");
// const morgan = require ("morgan");

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// const app = express();
// app.use(morgan('dev'));

// app.use(require('/routes'));

// // -------------------------------------------


