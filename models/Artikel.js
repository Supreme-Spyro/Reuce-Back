const mongoose = require('mongoose');

const artikelSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    source:String,
    image:String,
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Artikel = mongoose.model('Artikel', artikelSchema);

module.exports = Artikel;