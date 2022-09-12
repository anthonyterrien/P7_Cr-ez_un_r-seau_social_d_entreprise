const express = require('express');
const rateLimiter = require('../middleware/rateLimiter');
const checkToken = require('../middleware/jsonWebToken');
const userCtrl = require('../controllers/user');
let router = express.Router();

router.put('', rateLimiter, userCtrl.signup);
router.post('/login', rateLimiter, userCtrl.login);
router.get('/all', checkToken, userCtrl.getAllUsers);
router.get('/:id', checkToken, userCtrl.getUser);
router.patch('/:id', checkToken, userCtrl.updateUser);
router.post('/untrash/:id', checkToken, userCtrl.untrashUser);
router.delete('/trash/:id', checkToken, userCtrl.trashUser);
router.delete('/:id', checkToken, userCtrl.deleteUser);

module.exports = router
