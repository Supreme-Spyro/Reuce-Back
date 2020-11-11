var express = require("express");
var router = express.Router();
var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/product");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const {
  getAllProduct,
  getProductById,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
} = require("./controller.product");

const { auth, isAdmin } = require("../../helper/auth");

/* GET users listing. */
router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), postProduct);
router.put("/:id", updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);
router.get("/search/:id", getProductByName);

module.exports = router;
