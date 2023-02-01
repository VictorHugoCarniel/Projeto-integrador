const Sequelize = require('sequelize')
const sequelize = new Sequelize('integrador2', 'admin_user', '2I7pdNB03axFkiozFzFKyPrGbdpgrDWw', {    host: "dpg-cf5clhp4rebbub3necrg-a.oregon-postgres.render.com",
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: 'true'
        }
    }
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
