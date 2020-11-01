var express = require('express');
var router = express.Router();

const {
    getAllUser,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
} = require('./controller.user');


/* GET users listing. */
router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/register', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;