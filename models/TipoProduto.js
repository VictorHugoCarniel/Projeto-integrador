const db = require('./db');
// const Produtos = require('./Produtos');

const TipoProduto = db.sequelize.define('tipoproduto', {
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
//Produtos.sync({ alter: true })
//TipoProduto.sync({ force: true })
<<<<<<< Updated upstream
module.exports = TipoProduto;

// TipoProduto.hasMany(Produtos, {
//     contraint: true,
//     foreignKey: idTipoProduto
// })
=======
module.exports = TipoProduto;
>>>>>>> Stashed changes