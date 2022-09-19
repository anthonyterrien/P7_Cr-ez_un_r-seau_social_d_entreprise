const DB = require("../config/dbConfig");
const User = DB.User
const Post = DB.Post

// TODO remove duplicate code

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

const checkRoleForPost = async (req, res, next) => {
    let postId = parseInt(req.params.id)

    if (!postId) {
        return res.json(400).json({message: 'Missing data'})
    }

    let user = await User.findOne({where: {id: res.locals.id}, raw: true})
    if (user) {
        if (user.role !== 'admin') {
            let post = await Post.findOne({where: {id: postId}, raw: true})

            if (post.userId !== res.locals.id) {
                return res.status(401).json({message: 'You are not owner of this account'})
            }
        }
        res.locals = user.role;

        next()
    } else {
        return res.status(401).json({message: 'Your account no longer exists'})
    }
}
module.exports = checkRoleForPost
