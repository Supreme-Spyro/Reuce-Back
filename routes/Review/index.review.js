var express = require('express');
var router = express.Router();

const {
    getAllReview,
    getReviewById,
    postReview,
    updateReview,
    deleteReview,
} = require('./controller.review');

const { auth } = require('../../helper/auth');


/* GET Reviews listing. */
router.get('/', getAllReview);
router.get('/:id', getReviewById);
router.post('/', postReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);


module.exports = router;