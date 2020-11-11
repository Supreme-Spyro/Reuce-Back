var express = require('express');
var router = express.Router();

const {
    getAllCategory, 
    getCategoryById, 
    postCategory,
    updateCategory,
    deleteCategory
} = require("./controller.category")

const { auth, isAdmin } = require('../../helper/auth');

/* GET users listing. */
router.get('/', getAllCategory);
router.get('/:id', getCategoryById);
router.post('/', auth, isAdmin, postCategory);
router.put('/:id', updateCategory);
router.delete('/:id', auth, isAdmin, deleteCategory);

module.exports = router;