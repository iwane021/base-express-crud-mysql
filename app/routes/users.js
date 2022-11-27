const express = require('express');

const UserControllers = require('../controllers/users');

const router = express.Router();

// CREATE - POST
router.post('/', UserControllers.createNewUser);

//READ GET
router.get('/', UserControllers.getAllUsers);

//UPDATE - PATCH
router.patch('/:userId', UserControllers.updateUser);

//UPDATE - PATCH
router.delete('/:userId', UserControllers.deleteUser);

module.exports = router;
