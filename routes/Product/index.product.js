var express = require("express");
var router = express.Router();

const {
  getAllProduct,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
} = require("./controller.product");

/* GET users listing. */
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/", postProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/search/:id", getProductByName);

module.exports = router;