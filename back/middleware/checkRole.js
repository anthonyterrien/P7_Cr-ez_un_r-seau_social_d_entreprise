const DB = require("../config/dbConfig");
const User = DB.User

const checkRole = async (req, res, next) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.json(400).json({message: 'Missing data'})
    }

    let user = await User.findOne({where: {id: res.locals.id}, raw: true})
    if (user) {
        if (user.role !== 'admin') {
            if (userId !== res.locals.id) {
                return res.status(401).json({message: 'You are not owner of this account'})
            }
        }
        res.locals = user.role;

        next()
    } else {
        return res.status(401).json({message: 'Your account no longer exists'})
    }
}
module.exports = checkRole
