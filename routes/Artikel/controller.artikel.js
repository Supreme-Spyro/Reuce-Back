const mongoose = require('mongoose');
const Artikel = require('../../models/Artikel');

module.exports = {
  getAllArtikel: (req, res) => {
    Artikel.find().sort({title:1})
    .populate('admin')
    .then(result => {
      res.status(200).json({
        message: "success get data Artikel",
        result
      })
    })
    .catch(err => {
      res.status(404).json("cannot get data Artikel")
    })
  },

  getArtikelById: async (req, res) => {
    const Artikels = await Artikel.findById(req.params.id).sort({title:1}).populate('admin');
  
    try {
      res.json({
        message: "success get Artikel with id",
        Artikels
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  postArtikel: async (req, res) => {
    
    const artikel = createArtikel(req);
    
    try {
      artikel.save();
      res.json({
        message: "success add data Artikel",
        artikel:{
          _id: artikel.id,
          title: artikel.title,
          content: artikel.content,
          admin: artikel.admin,
          image: artikel.image
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateArtikel: (req, res) =>{
    Artikel.findByIdAndUpdate(req.params.id, req.body)
    .then(result =>{
        result.save();
        res.status(200).send("update Artikel success")
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  },
  deleteArtikel: (req, res) =>{
    Artikel.findByIdAndDelete(req.params.id)
    .then(result =>{
        if(result){
            res.status(200).send(`Artikel id: ${req.params.id} has been deleted`)
        } else{
            res.send('delete Artikel failed')
        }
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  }
};

const createArtikel = (req) => {
  return new Artikel({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      content: req.body.content,
      admin: req.body.admin,
      // image: req.file.path
      image:req.body.image
  });
}