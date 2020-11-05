const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    // amount:{
    //     type:Number,
    //     default:0
    // },
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

orderItemSchema.virtual('amount').get(()=>{
    let amount = 0;
    amount += this.product.price * this.quantity;
    return amount;
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;