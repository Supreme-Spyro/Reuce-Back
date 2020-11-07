const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
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

orderItemSchema.virtual('amount').get(function(){
    // let amount = 0;
    // amount += this.price * this.quantity;
    // console.log(typeof this.proudct.price)
    // console.log(typeof this.quantity)
    return this.product.price * this.quantity;
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;