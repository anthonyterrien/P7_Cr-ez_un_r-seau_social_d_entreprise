const express = require('express');
const checkToken = require('../middleware/jsonWebToken')
const commentCtrl = require('../controllers/comment');
const checkRoleForComment = require('../middleware/checkRole');
const router = express.Router();

router.put('', checkToken, commentCtrl.createComment);
router.get('/all', checkToken, commentCtrl.getAllComments);
router.get('/:id', checkToken, commentCtrl.getComment);
router.patch('/:id', checkToken, checkRoleForComment, commentCtrl.updateComment);
router.post('/untrash/:id', checkToken, checkRoleForComment, commentCtrl.untrashComment);
router.delete('/trash/:id', checkToken, checkRoleForComment, commentCtrl.trashComment);
router.delete('/:id', checkToken, commentCtrl.deleteComment);

module.exports = router;
