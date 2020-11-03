const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    product:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;