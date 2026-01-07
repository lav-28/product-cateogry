const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

const {validateProduct, validateProductId, handleValidationErrors} = require("../middleware/product.validator");

router.get("/GetAllProducts", (req, res) =>
  productController.getAllProducts(req, res)
);

router.post("/addProduct", 
  validateProduct,
  handleValidationErrors,
  productController.addProduct
);

router.get("/GetProductById/:id",
  validateProductId,
  handleValidationErrors,
  productController.getProductById
);

router.put("/updateProduct/:id",
  validateProductId,
  validateProduct,
  handleValidationErrors,
  productController.updateProduct
);

router.delete("/deleteProduct/:id",
  validateProductId,
  handleValidationErrors,
  productController.deleteProduct
);
module.exports = router;