const db = require('./db');
// const Produtos = require('./Produtos');

const TipoProduto = db.sequelize.define('tipoProduto', {
    idTipoProduto: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNUll: true
    },
    descricao: db.Sequelize.STRING
})


//force: criacao e exclusao de tabela
//alter: alteração de tabela
//TipoProdutos.sync({ alter: true })
// TipoProduto.sync({ force: true })
module.exports = TipoProduto;
