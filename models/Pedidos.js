const db = require('./db');
const Produtos = require('./produtos');
const User = require('./User');

const Pedidos = db.sequelize.define('pedido', {
    idPedido: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    produto: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cliente: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: db.Sequelize.FLOAT,
        allowNull: false
    },
    quantidade: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    data: {
        type: db.Sequelize.DATE,
        allowNull: false
    }
}, {
  timestamps: false // desativa createdAt e updatedAt
});

// Pedidos.sync({ force: true })
module.exports = Pedidos;
