const mongoose = require("mongoose");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const User = require("../../models/User");
const Grade = require("../../models/Grade");

module.exports = {
  getAllProduct: (req, res) => {
    Product.find()
      .sort({ name: 1 })
      .populate("category")
      .populate("grade")
      .populate({
        path: "user",
        populate: {
          path: "review",
          model: "Review",
        },
      })
      .then((result) => {
        res.status(200).json({
          message: "success get data product",
          result,
        });
      })
      .catch((err) => {
        res.status(404).json("cannot get data product");
      });
  },

  getProductById: async (req, res) => {
    const Products = await Product.findById(req.params.id)
      .sort({ name: 1 })
      .populate("category")
      .populate("grade")
      .populate({
        path: "user",
        populate: {
          path: "review",
          model: "Review",
        },
      });

    try {
      res.json({
        message: "success get product with id",
        Products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
  getProductName: async (req, res) => {
    const Products = await Product.find({ name: req.params.name });

    try {
      res.json({
        message: "success get product with name",
        Products,
      });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  },

  postProduct: async (req, res) => {
    
    const product = await createProduct(req);

    try {
      await product.save();
      const category = await Category.findById(req.body.category);
      await category.product.push(product.id);
      await category.save();
      const grade = await Grade.findById(req.body.grade);
      await grade.product.push(product.id);
      await grade.save();
      const user = await User.findById(req.body.user);
      await user.product.push(product.id);
      await user.save();

      res.json({
        message: "create product success",
        product: {
          _id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          category: product.category,
          grade: product.grade,
          weight: product.weight,
          user: product.user,
          role: product.role,
          image: product.image,
        },
      });
    } catch (error) {
      res.send(error);
    }
  },
  updateProduct: (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        result.save();
        res.status(200).send("update Product success");
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  deleteProduct: (req, res) => {
    Product.findByIdAndDelete(req.params.id)
      .then((result) => {
        if (result) {
          res.status(200).send(`Product id: ${req.params.id} has been deleted`);
        } else {
          res.send("delete Product failed");
        }
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  getProductByName: async (req, res) => {
    const parameter = req.params.id;
    const Products = await Product.find({
      name: { $regex: new RegExp(parameter), $options: "gi" },
    })
      .populate("category")
      .populate("grade")
      .populate({
        path: "user",
        populate: {
          path: "review",
          model: "Review",
        },
      });
    Products.map((item) => item.name).sort();

    try {
      res.json({
        message: `success get product with ${req.params.id}`,
        Products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  },
};

const createProduct = async (req) => {
  return new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    grade: req.body.grade,
    weight: req.body.weight,
    user: req.body.user,
    role: req.body.role,
    image: req.body.image
    // image: req.file.path,
  });
};
