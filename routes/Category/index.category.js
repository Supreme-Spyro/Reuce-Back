var express = require('express');
var router = express.Router();

const {
    getAllCategory, 
    getCategoryById, 
    postCategory,
    updateCategory,
    deleteCategory
} = require("./controller.category")

/* GET users listing. */
router.get('/', getAllCategory);
router.get('/:id', getCategoryById);
router.post('/', postCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;