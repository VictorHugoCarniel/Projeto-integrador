const db = require('./db')

const Produtos = db.sequelize.define('produtos', {
    idProduto: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNUll: true
    },
    nome: db.Sequelize.STRING,
    preco: db.Sequelize.DOUBLE,
    peso: db.Sequelize.DOUBLE,
    quantidade: db.Sequelize.INTEGER,
    tipo: db.Sequelize.STRING
})


//force: criacao e exclusao de tabela
//alter: alteração de tabela
//Produtos.sync({ alter: true })
// Produtos.sync({ force: true })
module.exports = Produtos;