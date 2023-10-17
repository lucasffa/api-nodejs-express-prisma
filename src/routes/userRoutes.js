const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/create/', UserController.createUser);
router.get('/get/:id', UserController.getUserById);
router.get('/get/', UserController.getAllUsers);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);

module.exports = router;
