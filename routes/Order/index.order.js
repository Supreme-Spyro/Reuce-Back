var express = require('express');
var router = express.Router();

const {
    getAllOrder, 
    getOrderById, 
    postOrder,
    updateOrder,
    deleteOrder
} = require("./controller.order")

const { auth, isAdmin } = require('../../helper/auth');

/* GET users listing. */
router.get('/', getAllOrder);
router.get('/:id', getOrderById);
router.post('/', postOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;