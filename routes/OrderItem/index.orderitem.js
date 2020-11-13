
var express = require('express');
var router = express.Router();

const {
    getAllOrderItem, 
    getOrderItemById, 
    postOrderItem,
    updateOrderItem,
    deleteOrderItem,
    getOrderItemByUser
} = require("./controller.orderitem")

const { auth, isAdmin } = require('../../helper/auth');

/* GET users listing. */
router.get('/', getAllOrderItem);
router.get('/user/:id', getOrderItemByUser)
router.get('/:id', getOrderItemById);
router.post('/', postOrderItem);
router.put('/:id', updateOrderItem);
router.delete('/:id',auth, deleteOrderItem);

module.exports = router;