const DB = require("../config/dbConfig");
const Post = DB.Post

exports.createPost = async (req, res) => {
    const { title, pictureUrl, content} = req.body

    // Data verification
    if (!title || !pictureUrl || !content) {
        return res.status(400).json({message: 'Missing parameter'})
    }

    try {
        // Post creation
        await Post.create({
            userId: res.locals.id,
            title: title,
            content: content,
            pictureUrl: pictureUrl,
        })
        return res.json({message: 'Post Created'})
    } catch (err) {
        return res.status(500).json({message: 'Database Error'})
    }
}

exports.getAllPosts = async (req, res) => {
    await Post.findAll()
        .then(posts => res.json({data: posts}))
        .catch(res.status(500).json({message: 'Database Error'}))
}

exports.getPost = () => {}
exports.updatePost = () => {}
exports.likePost = () => {}
exports.untrashPost = () => {}
exports.trashPost = () => {}
exports.deletePost = () => {}
