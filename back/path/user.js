const express = require('express');
const rateLimiter = require('../middleware/rateLimiter');
const checkToken = require('../middleware/jsonWebToken');
const checkRole = require('../middleware/checkRole');
const userCtrl = require('../controllers/user');
let router = express.Router();

router.put('', rateLimiter, userCtrl.signup);
router.post('/login', rateLimiter, userCtrl.login);
router.get('/all', checkToken, userCtrl.getAllUsers);
router.get('/:id', checkToken, userCtrl.getUser);
router.patch('/:id', checkToken, checkRole, userCtrl.updateUser);
router.post('/untrash/:id', checkToken, checkRole, userCtrl.untrashUser);
router.delete('/trash/:id', checkToken, checkRole, userCtrl.trashUser);
router.delete('/:id', checkToken, checkRole, userCtrl.deleteUser);

module.exports = router
