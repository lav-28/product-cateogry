const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/GetAllProducts", (req, res) =>
  productController.getAllProducts(req, res)
);

module.exports = router;