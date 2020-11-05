const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: String,
    email:{
        type: String,
        unique: true,
        required: true
    },
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: String,
    address: String,
    image: String,
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    },
    role:{
        type: String,
        enum:['user', 'recycler', 'admin'],
        default: 'user',
        required:true
    }
},{timestamps:true}
);

const User = mongoose.model('User', userSchema)

module.exports = User;