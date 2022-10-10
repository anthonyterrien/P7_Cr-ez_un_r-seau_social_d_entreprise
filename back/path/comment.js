const express = require('express');
const checkToken = require('../middleware/jsonWebToken')
const commentCtrl = require('../controllers/comment');
const checkRole = require('../middleware/checkRole');
const router = express.Router();

router.put('', checkToken, commentCtrl.createComment);
router.get('/all', checkToken, commentCtrl.getAllComments);
router.get('/:id', checkToken, commentCtrl.getComment);
router.patch('/:id', checkToken, checkRole.comment, checkRole.checkRole, commentCtrl.updateComment);
router.post('/untrash/:id', checkToken, checkRole.comment, checkRole.checkRole, commentCtrl.untrashComment);
router.delete('/trash/:id', checkToken, checkRole.comment, checkRole.checkRole, commentCtrl.trashComment);
router.delete('/:id', checkToken, checkRole.comment, checkRole.checkRole, commentCtrl.deleteComment);

module.exports = router;
