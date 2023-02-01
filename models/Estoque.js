const db = require('./db')
const Produtos = require('./Produtos')


const Estoque = db.sequelize.define('estoque', {
    idEstoque: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNUll: true
    },
    quantidade: db.Sequelize.DOUBLE,
})

Estoque.belongsTo(Produtos, {
    constraint: true,
    foreignKey: 'id'
})

//force: criacao e exclusao de tabela
//alter: alteração de tabela
//Produtos.sync({ alter: true })
//Estoque.sync({ force: true })
module.exports = Estoque;