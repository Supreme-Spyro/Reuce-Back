
var express = require('express');
var router = express.Router();

const {
    getAllOrderItem, 
    getOrderItemById, 
    postOrderItem,
    updateOrderItem,
    deleteOrderItem
} = require("./controller.orderitem")

const { auth, isAdmin } = require('../../helper/auth');

/* GET users listing. */
router.get('/', getAllOrderItem);
router.get('/:id', getOrderItemById);
router.post('/',auth, postOrderItem);
router.put('/:id', updateOrderItem);
router.delete('/:id',auth, deleteOrderItem);

module.exports = router;