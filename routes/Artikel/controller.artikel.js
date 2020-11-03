const Artikel = require('../../models/Artikel');

module.exports = {
  getAllArtikel: (req, res) => {
    Artikel.find()
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
    const Artikels = await Artikel.findById(req.params.id).populate('admin');
  
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
    
    const Artikels = await Artikel.create(req.body);
    
    try {
      res.json({
        message: "success add data Artikel",
        Artikels
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
}