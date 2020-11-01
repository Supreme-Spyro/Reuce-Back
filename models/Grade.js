const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;