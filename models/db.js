    const Sequelize = require('sequelize')
    const sequelize = new Sequelize('postgres', 'postgres', 'douglassav', {host: "integrador.cxmgoojjyn6r.us-east-1.rds.amazonaws.com",
        dialect: 'postgres',
        protocol: 'postgres',
    })

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }
