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
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
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

// userSchema.methods.isAdmin = function () {
//     console.log("data role: ",this.role)
//     return this.role.find(role => role == 'admin');
// };

const User = mongoose.model('User', userSchema)

module.exports = User;