const mongoose = require('mongoose');
const { findById } = require('./Product');
const Product = require('./Product')

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    amount:Number,
    quantity:{
        type:Number,
        default:1
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps: true});

// orderItemSchema.virtual('amount').get(function(){
//     // let amount = 0;
//     // amount += this.price * this.quantity;
//     console.log("data product:",this.product)
//     console.log(typeof this.quantity)
//     return this.product.price * this.quantity;
// })

orderItemSchema.pre('save', async function(){

    let products = await Product.findById(this.product)
    this.amount = products.price * this.quantity
    return this.amount
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;