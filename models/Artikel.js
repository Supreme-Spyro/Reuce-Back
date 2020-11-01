const mongoose = require('mongoose');

const artikelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

const Artikel = mongoose.model('Artikel', artikelSchema);

module.exports = Artikel;