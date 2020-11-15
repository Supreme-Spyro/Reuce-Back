const mongoose = require('mongoose')
const Category = require('../../models/Category');

module.exports = {
  getAllCategory: (req, res) => {
    Category.find().sort({name:1})
    .populate({
      path:'product',
      model:'Product'
    })
    .then(result => {
      res.status(200).json({
        message: "success get data Category",
        result
      })
    })
    .catch(err => {
      res.status(404).json("cannot get data Category")
    })
  },

  getCategoryById: async (req, res) => {
    const Categories = await Category.findById(req.params.id).sort({name:1})
    .populate({
      path:'product',
      model:'Product'
    });
  
    try {
      res.json({
        message: "success get Category with id",
        Categories
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },

  postCategory: async (req, res) => {
    
    const category = createCategory(req);
    
    try {
      await category.save()
      res.json({
        message: "create category success",
        category: {
          _id: product.id,
          name: product.name,
          product: product.product,
          image: product.image,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  updateCategory: (req, res) =>{
    Category.findByIdAndUpdate(req.params.id, req.body)
    .then(result =>{
        result.save();
        res.status(200).send("update Category success")
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  },
  deleteCategory: (req, res) =>{
    Category.findByIdAndDelete(req.params.id)
    .then(result =>{
        if(result){
            res.status(200).send(`Category id: ${req.params.id} has been deleted`)
        } else{
            res.send('delete Category failed')
        }
    })
    .catch(error =>{
        res.status(404).send(error)
    })
  }
}

const createCategory = (req) => {
  return new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    product: req.body.product,
    image: req.file.path,
  });
};