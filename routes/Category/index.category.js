var express = require("express");
var router = express.Router();
var multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/category");
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
  getAllCategory,
  getCategoryById,
  postCategory,
  updateCategory,
  deleteCategory,
} = require("./controller.category");

const { auth, isAdmin } = require("../../helper/auth");

/* GET users listing. */
router.get("/", getAllCategory);
router.get("/:id", getCategoryById);
router.post("/", upload.single("image"), postCategory);
router.put("/:id", updateCategory);
router.delete("/:id", auth, isAdmin, deleteCategory);

module.exports = router;
