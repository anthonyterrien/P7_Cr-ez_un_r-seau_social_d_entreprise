const DB = require('../config/dbConfig')
const User = DB.User

exports.signup = async (req, res) => {
    const {lastName, firstName, pseudo, email, password} = req.body

    // Data verification
    if (!lastName || !firstName || !pseudo || !email || !password) {
        return res.status(400).json({message: 'missing data'});
    }

    try {
        // Checking if the email already exists
        if (await User.findOne({where: {email: email}, raw: true})) {
            return res.status(409).json({message: `an account already exists with this email: ${email}`});
        }
        // Checking if the pseudo already exists
        if (await User.findOne({where: {pseudo: pseudo}, raw: true})) {
            return res.status(409).json({message: `an account already exists with this pseudo: ${pseudo}`});
        }
        // User creation
        await User.create(req.body);
        console.log(`- User '${email}' Created`)
        return res.status(201).json({message: 'User Created'});

    } catch (err) {

        if (err.name === 'SequelizeDatabaseError') {
            res.status(500).json({message: 'Database Error'});
        } else {
            res.status(500).json({message: 'Hash Process Error'});
        }
    }
}

exports.login = () => {}
exports.getAllUsers = () => {}
exports.getUser = () => {}
exports.updateUser = () => {}
exports.untrashUser = () => {}
exports.trashUser = () => {}
exports.deleteUser = () => {}
