var express = require('express');
var router = express.Router();

const {
    getAllArtikel,
    getArtikelById,
    postArtikel,
    updateArtikel,
    deleteArtikel,
} = require('./controller.artikel');

const { auth } = require('../../helper/auth');


/* GET Artikels listing. */
router.get('/', getAllArtikel);
router.get('/:id', getArtikelById);
router.post('/', postArtikel);
router.put('/:id', updateArtikel);
router.delete('/:id', deleteArtikel);


module.exports = router;