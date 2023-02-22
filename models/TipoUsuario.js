const db = require('./db')

const TipoUsuario = db.sequelize.define('tipoUsuario', {
    idTipoUsuario: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: db.Sequelize.STRING,
        allowNUll: false, 
    }
})

//force: criacao e exclusao de tabela
//alter: alteração de tabela
//User.sync({ alter: true })
// TipoUsuario.sync({ force: true })
module.exports = TipoUsuario;