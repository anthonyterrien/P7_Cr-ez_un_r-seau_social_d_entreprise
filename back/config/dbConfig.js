const { Sequelize } = require('sequelize')

// connect to the database
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)

// Establishing relations
const db = {}

db.sequelize = sequelize
db.User = require('../models/user')(sequelize)
db.Post = require('../models/post')(sequelize)
db.Comment = require('../models/comment')(sequelize)

db.sequelize.sync({alter: true})

module.exports = db
