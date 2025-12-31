const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/GetAllProducts", (req, res) =>
  productController.getAllProducts(req, res)
);
router.post("/addProduct",(req, res) => 
  productController.addProduct(req, res)
);
router.get("/GetProductById/:id", (req, res) => 
    productController.getProductById(req, res)
);

module.exports = router;