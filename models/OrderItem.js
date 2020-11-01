const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps: true});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;