
var express = require('express');
var router = express.Router();

const {
    getAllOrderItem, 
    getOrderItemById, 
    postOrderItem,
    updateOrderItem,
    deleteOrderItem
} = require("./controller.orderitem")

/* GET users listing. */
router.get('/', getAllOrderItem);
router.get('/:id', getOrderItemById);
router.post('/', postOrderItem);
router.put('/:id', updateOrderItem);
router.delete('/:id', deleteOrderItem);

module.exports = router;