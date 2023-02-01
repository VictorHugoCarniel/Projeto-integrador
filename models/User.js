const db = require('./db');

const User = db.sequelize.define('user', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: db.Sequelize.STRING,
    sobrenome: db.Sequelize.STRING,
    email: {
        type: db.Sequelize.STRING,
        autoIncrement: false,
        allowNUll: false, 
        primaryKey: true,
        unique: true
    },
    telefone: db.Sequelize.STRING,
    cidade: db.Sequelize.STRING,
    senha: db.Sequelize.STRING
})

//force: criacao e exclusao de tabela
//alter: alteração de tabela
//User.sync({ alter: true })
//User.sync({ force: true })
module.exports = User;