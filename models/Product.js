const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }],
    grade:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Grade'
    },
    weight:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:String,
    role:{
        type:String,
        enum:['jual','beli'],
        default:'jual'
    }
},{timestamps: true})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;