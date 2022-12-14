const DB = require("../config/dbConfig");
const Post = DB.Post
const PostLiked = DB.PostLiked

exports.createPost = async (req, res) => {
    const postObject = JSON.parse(req.body.post);

    postObject.pictureUrl = `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`;

    // Data verification
    if (!postObject.title || !postObject.pictureUrl || !postObject.content) {
        return res.status(400).json({message: 'Missing parameter'})
    }

    try {
        // Post creation
        await Post.create({
            userId: res.locals.id,
            title: postObject.title,
            content: postObject.content,
            pictureUrl: postObject.pictureUrl,
        })
        return res.json({message: 'Post Created'})
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.getAllPosts = async (req, res) => {
    try {
        await Post.findAll()
            .then(posts => res.json({data: posts}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.getPost = async (req, res) => {
    let postId = parseInt(req.params.id)
    // Data verification
    if (!postId) {
        return res.json(400).json({message: 'Missing Parameter'})
    }
    try {
        // Post Recovery
        let post = await Post.findOne({
            where: {id: postId},
        })
        // Test if result
        if (post === null) {
            return res.status(404).json({message: 'This post does not exist !'})
        }
        // Send post found
        return res.json({data: post})
    } catch (err) {
        return res.status(500).json({message: 'Database Error', error: err})
    }
}

exports.getPostLiked = async (req, res) => {
    try {
        await PostLiked.findAll()
            .then(postLiked => res.json({data: postLiked}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.updatePost = async (req, res) => {
    const changeImg = req.file
    const justContent = JSON.parse(req.body.post)
    let postToUpdate = ''

    if (changeImg) {
        changeImg.pictureUrl = `${req.protocol}://${req.get("host")}/pictures/${req.file.filename}`;
        postToUpdate = changeImg
        postToUpdate.title = justContent.title
        postToUpdate.content = justContent.content
    } else
         if (justContent) {
        postToUpdate = justContent
    } else {
        return res.json(400).json({message: 'Missing Parameter'})
    }

    try {
        // Check not change data prohibited
        if (res.locals !== 'admin') {
            if (postToUpdate.id
                || postToUpdate.userId
                || postToUpdate.createdAt
                || postToUpdate.updatedAt) {
                return res.status(401).json({message: 'you are not authorized'})
            }
        }
        // Update Post
        await Post.update(
            postToUpdate,
            {
                where: {id: req.params.id},
            })
        return res.json({message: 'Post Updated'})
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.likePost = async (req, res) => {
    let postId = parseInt(req.params.id)
    let passingCount = 0
    // Data verification
    if (!postId) {
        return res.json(400).json({message: 'Missing Parameter'})
    }
    // PostLikedList Recovery
    let postLikedList = await PostLiked.findAll()

    if (postLikedList.length === 0) {
        await PostLikeAdded(postId, res.locals.id)
            .then(response => res.json({message: `${response}`}))
        return
    }
    for (let postLiked of postLikedList) {
        passingCount++
        if (postLiked.postId === postId && postLiked.userIdLiked === res.locals.id) {
            await PostLikeDelete(postId, res.locals.id)
                .then(response => res.json({message: `${response}`}))
            return
        } else
            if (postLikedList.length === passingCount) {
            await PostLikeAdded(postId, res.locals.id)
                .then(response => res.json({message: `${response}`}))
            return
        }
    }
}

async function PostLikeAdded(postId, userId) {
    try {
        // PostLiked creation
        await PostLiked.create({
            postId: postId,
            userIdLiked: userId,
        })
        // response message
        return 'Like added'
    } catch (err) {
        // response message
        return 'Database Error'
    }
}

async function PostLikeDelete(postId, userId) {
    try {
        // PostLiked creation
        await PostLiked.destroy({where: {postId: postId, userIdLiked: userId}, force: true})
        // response message
        return 'Like delete'
    } catch (err) {
        // response message
        return 'Database Error'
    }
}

exports.untrashPost = async (req, res) => {
    let postId = parseInt(req.params.id)

    try {
        // Restore post
        Post.restore({where: {id: postId}})
            .then(() => res.status(204).json({}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.trashPost = async (req, res) => {
    let postId = parseInt(req.params.id)

    try {
        // soft Delete post
        Post.destroy({where: {id: postId}})
            .then(() => res.status(204).json({}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.deletePost = async (req, res) => {
    let postId = parseInt(req.params.id)

    try {
        // Delete post
        Post.destroy({where: {id: postId}, force: true})
            .then(() => res.status(204).json({}))
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}
