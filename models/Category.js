const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:String,
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
    image:String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;