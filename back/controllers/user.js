const DB = require('../config/dbConfig')
const User = DB.User
const jwt = require('jsonwebtoken');

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

exports.login = async (req, res) => {
    const {pseudo, password} = req.body

    // Data verification
    if (!pseudo || !password) {
        return res.status(400).json({message: 'missing data'})
    }

    try {
        // Checking if the pseudo exists
        let user = await User.findOne({where: {pseudo: pseudo}, raw: true})

        if (user === null) {
            return res.status(401).json({message: 'This account does not exists'})
        }
        // Checking password
        if (!await User.checkPassword(password, user.password)) {
            return res.status(401).json({message: 'Wrong password'})
        }

        // Token generation and sending
        const token = jwt.sign({
                id: user.id,
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email
            }, process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_DURING})

        return res.json({access_token: token})

    } catch (err) {

        if (err.name === 'SequelizeDatabaseError') {
            res.status(500).json({message: 'Database Error'})
        } else {
            res.status(500).json({message: 'Login process failed'})
        }
    }
}

exports.getAllUsers = async (req, res) => {
    await User.findAll({
        attributes: [
            'id',
            'pseudo',
            'email',
        ]
    })
        .then(users => res.json({users: users}))
        .catch(res.status(500).json({message: 'Database Error'}))
}

exports.getUser = () => {}
exports.updateUser = () => {}
exports.untrashUser = () => {}
exports.trashUser = () => {}
exports.deleteUser = () => {}
