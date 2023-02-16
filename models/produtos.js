const db = require('./db')
const TipoProduto = require ('./TipoProduto')


const Produtos = db.sequelize.define('produto', {
    idProduto: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNUll: true
    },
    nome: db.Sequelize.STRING,
    preco: db.Sequelize.DOUBLE,
    peso: db.Sequelize.DOUBLE,
    quantidade: db.Sequelize.INTEGER
})

Produtos.belongsTo(TipoProduto, {
    constraint: true,
    foreignKey: 'idTipoProduto'
})

//force: criacao e exclusao de tabela
//alter: alteração de tabela
//Produtos.sync({ alter: true })
// Produtos.sync({ force: true })
module.exports = Produtos;

