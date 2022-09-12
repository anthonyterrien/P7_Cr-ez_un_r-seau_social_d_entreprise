const DB = require('../config/dbConfig')
const User = DB.User
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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

exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    // Data verification
    if (!userId) {
        return res.json(400).json({message: 'Missing data'})
    }

    try {
        // Checking if the user exists and sending
        let user = await User.findOne({where: {id: userId}, attributes: ['id', 'pseudo', 'email']})
        if (user === null) {
            return res.status(401).json({message: 'This user does not exist'})
        }
        return res.json({user: user})

    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.updateUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    try {
        // Data verification
        if (!userId) {
            return res.status(400).json({message: 'Missing data'})
        }
        // Checking if the user exists
        if (await User.findOne({where: {id: userId}, raw: true}) === null) {
            return res.status(404).json({message: 'This user does not exist'})
        }
        let user = await User.findOne({where: {id: res.locals.id}, raw: true})
        // Checking user or admin
        if (user.role !== 'admin') {
            if (userId !== res.locals.id) {
                return res.status(401).json({message: 'You are not owner of this account'})
            }
            // Check not change data prohibited
            if (req.body.id
                || req.body.role
                || req.body.createdAt
                || req.body.updatedAt) {
                return res.status(401).json({message: 'you are not authorized'})
            }
        }
        // If change of email check if it already exists
        if (req.body.email) {
            if (await User.findOne({where: {email: req.body.email}, raw: true})) {
                return res.status(409).json({message: `An account already exists with this email: ${req.body.email}`});
            }
        }
        // If change of pseudo check if it already exists
        if (req.body.pseudo) {
            if (await User.findOne({where: {pseudo: req.body.pseudo}, raw: true})) {
                return res.status(409).json({message: `an account already exists with this pseudo: ${req.body.pseudo}`});
            }
        }
        // If change password, hash new
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        }
        // Update user
        await User.update(
            req.body, {
                where: {id: userId},
            })
        return res.json({message: 'User Updated'})
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.untrashUser = () => {}
exports.trashUser = () => {}
exports.deleteUser = () => {}
