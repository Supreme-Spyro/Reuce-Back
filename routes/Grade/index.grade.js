var express = require('express');
var router = express.Router();

const {
    getAllGrade, 
    getGradeById, 
    postGrade,
    updateGrade,
    deleteGrade
} = require("./controller.grade")

const { auth, isAdmin } = require('../../helper/auth');

/* GET users listing. */
router.get('/', getAllGrade);
router.get('/:id', getGradeById);
router.post('/', auth, isAdmin, postGrade);
router.put('/:id', updateGrade);
router.delete('/:id', auth, isAdmin, deleteGrade);

module.exports = router;