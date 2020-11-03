var express = require('express');
var router = express.Router();

const {
    getAllGrade, 
    getGradeById, 
    postGrade,
    updateGrade,
    deleteGrade
} = require("./controller.grade")

/* GET users listing. */
router.get('/', getAllGrade);
router.get('/:id', getGradeById);
router.post('/', postGrade);
router.put('/:id', updateGrade);
router.delete('/:id', deleteGrade);

module.exports = router;