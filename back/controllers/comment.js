const DB = require("../config/dbConfig");
const Comment = DB.Comment
const Post = DB.Post

exports.createComment = async (req, res) => {
    const {postId, content} = req.body

    // Data verification
    if (!postId || !content) {
        return res.status(400).json({message: 'Missing parameter'})
    }
    // Post Recovery
    let post = await Post.findOne({
        where: {id: postId},
    })
    // Test if result
    if (post === null) {
        return res.status(404).json({message: 'This post does not exist !'})
    }
    try {
        // Comment creation
        await Comment.create({
            postId: postId,
            userId: res.locals.id,
            content: content,
        })
        return res.json({message: 'Comment Created'})
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.getAllComments = async (req, res) => {
    await Comment.findAll()
        .then(Comments => res.json({data: Comments}))
        .catch(res.status(500).json({message: 'Database Error'}))
}

exports.getComment = async (req, res) => {
    let commentId = parseInt(req.params.id)
    // Data verification
    if (!commentId) {
        return res.json(400).json({message: 'Missing Parameter'})
    }
    try {
        // Comment Recovery
        let comment = await Comment.findOne({
            where: {id: commentId},
        })
        // Test if result
        if (comment === null) {
            return res.status(404).json({message: 'This comment does not exist !'})
        }
        // Send comment found
        return res.json({data: comment})
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.updateComment = async (req, res) => {
    let commentId = parseInt(req.params.id)

    try {
        // Check not change data prohibited
        if (res.locals !== 'admin') {
            if (req.body.id
                || req.body.postId
                || req.body.userId
                || req.body.createdAt
                || req.body.updatedAt) {
                return res.status(401).json({message: 'you are not authorized'})
            }
        }
        // Update Comment
        await Comment.update(
            req.body, {
                where: {id: commentId},
            })
        return res.json({message: 'Comment Updated'})
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.untrashComment = async (req, res) => {
    let commentId = parseInt(req.params.id)

    try {
        // Restore comment
        Comment.restore({where: {id: commentId}})
            .then(() => res.status(204).json({}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.trashComment = async (req, res) => {
    let commentId = parseInt(req.params.id)

    try {
        // soft Delete comment
        Comment.destroy({where: {id: commentId}})
            .then(() => res.status(204).json({}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.deleteComment = async (req, res) => {
    let commentId = parseInt(req.params.id)

    try {
        // Delete comment
        Comment.destroy({where: {id: commentId}, force: true})
            .then(() => res.status(204).json({}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}
