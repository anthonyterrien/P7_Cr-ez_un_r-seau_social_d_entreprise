const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true,
        },
        lastName:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        firstName:{
            type: DataTypes.STRING(100),
            allowNull: false
        },
        pseudo:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        email:{
            type: DataTypes.STRING,
            validate:{
                isEmail: true // data validation
            }
        },
        password:{
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i // a constraint
        },
        role:{
            type: DataTypes.STRING(5),
            defaultValue: 'user',
            allowNull: false
        }
    }, { paranoid: true }) // Here for softDelete

    User.beforeCreate( async (user) => {
        user.password = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    })

    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel)
    }

    return User
}
