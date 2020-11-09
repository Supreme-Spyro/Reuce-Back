var express = require('express');
var router = express.Router();

const {
    getAllUser,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    myProfile
} = require('./controller.user');

const { auth, isAdmin, userOwnOrIsAdmin } = require('../../helper/auth');

router.get('/myprofile', auth, myProfile);

/* GET users listing. */
router.get('/', getAllUser);
router.get('/:id',  getUserById);
router.post('/register', registerUser);
router.put('/:id', updateUser);
router.delete('/:id', auth, isAdmin, deleteUser);
router.post('/login', loginUser);


module.exports = router;