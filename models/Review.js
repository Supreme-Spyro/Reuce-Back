const mongoose = require('mongoose');

const reviewschema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    commenter:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
},{timestamps:true}
);

const Review = mongoose.model('Review', reviewschema);

module.exports = Review;