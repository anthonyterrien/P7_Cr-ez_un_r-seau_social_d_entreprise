const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        pictureUrl: {
            type: DataTypes.STRING,
        },
    }, { paranoid: true }) // Here for softDelete
}
