const DB = require("../config/dbConfig");
const User = DB.User
const Post = DB.Post
const Comment = DB.Comment
let origin

exports.user = (req, res, next) => {
    origin = 'user'
    next()
}

exports.post = (req, res, next) => {
    origin = 'post'
    next()
}

exports.comment = (req, res, next) => {
    origin = 'comment'
    next()
}

exports.checkRole = async (req, res, next) => {
    let Id = parseInt(req.params.id)
    let userId

    if (!Id) {
        return res.json(400).json({message: 'Missing data'})
    }

    let user = await User.findOne({where: {id: res.locals.id}, raw: true})
    if (user) {
        // Bypass if admin role
        if (user.role !== 'admin') {
            if (origin === 'user') {
                // Check if user exist
                if (await User.findOne({where: {id: Id}, raw: true}) === null) {
                    return res.status(404).json({message: 'This user does not exist'})
                }
                userId = Id
            } else
                 if (origin === 'post') {
                let post = await Post.findOne({where: {id: Id}, raw: true})
                     // Check if post exist
                if (post === null) {
                    return res.status(404).json({message: 'This post does not exist'})
                }
                userId = post.userId
            } else
                 if (origin === 'comment') {
                let comment = await Comment.findOne({where: {id: Id}, raw: true})
                     // Check if comment exist
                if (comment === null) {
                    return res.status(404).json({message: 'This comment does not exist'})
                }
                userId = comment.userId
            }
                 // Check if user is property
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
