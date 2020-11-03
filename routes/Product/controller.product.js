const Product = require("../../models/Product");

module.exports = {
  getAllProduct: (req, res) => {
    Product.find()
    //   .populate("category")
    //   .populate("platform")
    //   .populate({
    //     path: "comment_id",
    //     populate: {
    //       path: "user_id",
    //       model: "user",
    //     },
    //   })
    //   .populate({
    //     path: "review_id",
    //     populate: {
    //       path: "user_id",
    //       model: "user",
    //     },
    //   })
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
    //   .populate("category")
    //   .populate("platform")
    //   .populate({
    //     path: "comment_id",
    //     populate: {
    //       path: "user_id",
    //       model: "user",
    //     },
    //   })
    //   .populate({
    //     path: "review_id",
    //     populate: {
    //       path: "user_id",
    //       model: "user",
    //     },
    //   });

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
    const Products = await Product.create(req.body);

    try {
      res.json({
        message: "success add data product",
        Products,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
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
    const Products = await Product.find({ name: parameter })
    //   .populate("category")
    //   .populate("platform")
    //   .populate({
    //     path: "comment_id",
    //     populate: {
    //       path: "user_id",
    //       model: "user",
    //     },
    //   })
    //   .populate({
    //     path: "review_id",
    //     populate: {
    //       path: "user_id",
    //       model: "user",
    //     },
    //   });
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