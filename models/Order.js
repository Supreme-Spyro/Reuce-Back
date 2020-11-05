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

orderSchema.virtual('total').get(()=>{
    let total = 0;
    for (let i = 0; i < this.orderItem.length; i++)
        total += this.orderItem[i].price;
    return total;
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;