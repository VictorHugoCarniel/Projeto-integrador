const Sequelize = require('sequelize')
const sequelize = new Sequelize('integrador', 'admin_user', 'krX7MpSYvqOTAjYSPDDLhFNHHu25uAde', { host: "dpg-cg147el269vfsnr3ekjg-a.oregon-postgres.render.com",protocol: 'postgres',dialect: 'postgres', dialectOptions: { ssl: { require: 'false' } }})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
