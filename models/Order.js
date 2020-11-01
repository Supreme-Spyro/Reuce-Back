const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{timestamps:true}
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;