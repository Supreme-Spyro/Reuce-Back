const Grade = require('../../models/Grade');

module.exports = {
  getAllGrade: (req, res) => {
    Grade.find()
    .populate({
      path:'product',
      populate:{
        path:'category',
        model:'Category'
      }
    })
    .then(result => {
      res.status(200).json({
        message: "success get data Grade",
        result
      })
    })
    .catch(err => {
      res.status(404).json("cannot get data Grade")
    })
  },

  getGradeById: async (req, res) => {
    const Categories = await Grade.findById(req.params.id)
    .populate({
      path:'product',
      populate:{
        path:'category',
        model:'Category'
      }
    });
  
    try {
      res.json({
        message: "success get Grade with id",
        Categories
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  postGrade: async (req, res) => {
    
    const Categories = await Grade.create(req.body);
    
    try {
      res.json({
        message: "success add data Grade",
        Categories
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateGrade: (req, res) =>{
    Grade.findByIdAndUpdate(req.params.id, req.body)
    .then(result =>{
        result.save();
        res.status(200).send("update Grade success")
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  },
  deleteGrade: (req, res) =>{
    Grade.findByIdAndDelete(req.params.id)
    .then(result =>{
        if(result){
            res.status(200).send(`Grade id: ${req.params.id} has been deleted`)
        } else{
            res.send('delete Grade failed')
        }
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  }
}