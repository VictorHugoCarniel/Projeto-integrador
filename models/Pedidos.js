const db = require('./db');
const User = require('./User');
const Pedidos = db.sequelize.define('pedido', {
    idPedido: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
       allowNull: false
    },
    produto: db.Sequelize.STRING,
    cliente: db.Sequelize.STRING,
    preco: db.Sequelize.DOUBLE,
    quantidade: db.Sequelize.INTEGER,
    Data: db.Sequelize.STRING

})





//Pedidos.sync({ force: true })

module.exports = Pedidos;