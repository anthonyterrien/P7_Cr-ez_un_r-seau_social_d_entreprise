const express = require('express');
const checkToken = require('../middleware/jsonWebToken');
const postCtrl = require('../controllers/post');
const checkRole = require('../middleware/checkRole');
let router = express.Router();

router.put('', checkToken, postCtrl.createPost);
router.get('/all', checkToken, postCtrl.getAllPosts);
router.get('/:id', checkToken, postCtrl.getPost);
router.get('/like', checkToken, postCtrl.getPostLiked);
router.patch('/:id', checkToken, checkRole.post, checkRole.checkRole, postCtrl.updatePost);
router.post('/:id/like', checkToken, postCtrl.likePost);
router.post('/untrash/:id', checkToken, checkRole.post, checkRole.checkRole, postCtrl.untrashPost);
router.delete('/trash/:id', checkToken, checkRole.post, checkRole.checkRole, postCtrl.trashPost);
router.delete('/:id', checkToken, checkRole.post, checkRole.checkRole, postCtrl.deletePost);

module.exports = router
