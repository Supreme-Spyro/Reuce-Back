const mongoose = require('mongoose');
const OrderItem = require('./OrderItem')

const orderSchema = new mongoose.Schema({
    orderItem:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    total: Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{timestamps:true}
);

// orderSchema.virtual('total').get(function(){
//     let total = 0;
//     for (let i = 0; i < this.orderItem.length; i++)
//         total += this.orderItem[i].amount;
//     return total;
// });

orderSchema.pre('save', async function(){
    let orderItems = await OrderItem.find({_id: this.orderItem})
    let total = 0;
    for (let i = 0; i < orderItems.length; i++)
    total += orderItems[i].amount
    return this.total = total 
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;