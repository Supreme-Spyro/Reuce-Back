
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
router.get('/',auth, getAllOrderItem);
router.get('/:id',auth, getOrderItemById);
router.post('/',auth, postOrderItem);
router.put('/:id', updateOrderItem);
router.delete('/:id',auth, deleteOrderItem);

module.exports = router;