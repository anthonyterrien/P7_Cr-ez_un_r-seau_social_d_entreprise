const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    return PostLiked = sequelize.define('PostLiked', {
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userIdLiked: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, { paranoid: true }) // Here for softDelete
}
