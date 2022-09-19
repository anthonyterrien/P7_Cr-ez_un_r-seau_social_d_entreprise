const express = require('express');
const checkToken = require('../middleware/jsonWebToken');
const postCtrl = require('../controllers/post');
let router = express.Router();

router.put('', checkToken, postCtrl.createPost);
router.get('/all', checkToken, postCtrl.getAllPosts);
router.get('/:id', checkToken, postCtrl.getPost);
router.patch('/:id', checkToken, postCtrl.updatePost);
router.post('/:id/like', checkToken, postCtrl.likePost);
router.post('/untrash/:id', checkToken, postCtrl.untrashPost);
router.delete('/trash/:id', checkToken, postCtrl.trashPost);
router.delete('/:id', checkToken, postCtrl.deletePost);

module.exports = router
