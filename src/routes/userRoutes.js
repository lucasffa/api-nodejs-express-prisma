const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUserById);
router.get('/', UserController.getAllUsers);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
