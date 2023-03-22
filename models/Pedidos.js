const db = require('./db')
const Produtos = require ('./produtos')
const User = require('./User')

const Pedidos = db.sequelize.define('pedido', {
    idPedido: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNUll: true
    },
    idProduto: db.Sequelize.INTEGER,
    id: db.Sequelize.INTEGER
})

// Pedidos.sync({ force: true})
module.exports = Pedidos;

Pedidos.belongsTo(Produtos, {
    constraint: true,
    foreignKey: 'idProduto'
})

Pedidos.belongsTo(User, {
    constraint: true,
    foreignKey: 'id'
})
