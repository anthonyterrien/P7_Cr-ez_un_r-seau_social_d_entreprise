const express = require('express');
const checkToken = require('../middleware/jsonWebToken')
const commentCtrl = require('../controllers/comment');
const router = express.Router();

router.put('', checkToken, commentCtrl.createComment);
router.get('/all', checkToken, commentCtrl.getAllComments);
router.get('/:id', checkToken, commentCtrl.getComments);
router.patch('/:id', checkToken, commentCtrl.updateComment);
router.post('/untrash/:id', checkToken, commentCtrl.untrashComment);
router.delete('/trash/:id', checkToken, commentCtrl.trashComment);
router.delete('/:id', checkToken, commentCtrl.deleteComment);

module.exports = router;
