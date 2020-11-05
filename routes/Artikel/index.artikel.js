var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/artikel');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
  });

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
router.post('/',  upload.single('image'), postArtikel);
router.put('/:id', updateArtikel);
router.delete('/:id', deleteArtikel);


module.exports = router;