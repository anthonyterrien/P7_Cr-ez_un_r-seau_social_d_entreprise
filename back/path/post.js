const express = require('express');
const checkToken = require('../middleware/jsonWebToken');
const postCtrl = require('../controllers/post');
const checkRoleForPost = require('../middleware/checkRole');
let router = express.Router();

router.put('', checkToken, postCtrl.createPost);
router.get('/all', checkToken, postCtrl.getAllPosts);
router.get('/:id', checkToken, postCtrl.getPost);
router.patch('/:id', checkToken, checkRoleForPost, postCtrl.updatePost);
router.post('/:id/like', checkToken, postCtrl.likePost);
router.post('/untrash/:id', checkToken, checkRoleForPost, postCtrl.untrashPost);
router.delete('/trash/:id', checkToken, checkRoleForPost, postCtrl.trashPost);
router.delete('/:id', checkToken, checkRoleForPost, postCtrl.deletePost);

module.exports = router
