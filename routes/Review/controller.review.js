const Review = require('../../models/Review');

module.exports = {
  getAllReview: (req, res) => {
    Review.find()
    .populate('commenter')
    .then(result => {
      res.status(200).json({
        message: "success get data Review",
        result
      })
    })
    .catch(err => {
      res.status(404).json("cannot get data Review")
    })
  },

  getReviewById: async (req, res) => {
    const Reviews = await Review.findById(req.params.id).populate('commenter');
  
    try {
      res.json({
        message: "success get Review with id",
        Reviews
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  postReview: async (req, res) => {
    
    const Reviews = await Review.create(req.body);
    
    try {
      res.json({
        message: "success add data Review",
        Reviews
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateReview: (req, res) =>{
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(result =>{
        result.save();
        res.status(200).send("update Review success")
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  },
  deleteReview: (req, res) =>{
    Review.findByIdAndDelete(req.params.id)
    .then(result =>{
        if(result){
            res.status(200).send(`Review id: ${req.params.id} has been deleted`)
        } else{
            res.send('delete Review failed')
        }
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  }
}