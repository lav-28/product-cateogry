const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

const{validateCategory,
    validateCategoryId,
    handleValidationErrors} = require("../middleware/category.validator");

router.get("/GetAllCategories", (req, res) => {
  categoryController.getAllCategories(req, res)
});

router.post("/addCategory",
  validateCategory,
  handleValidationErrors,
  categoryController.addCategory
); 

router.get("/GetCategoryById/:id", 
  validateCategoryId, 
  handleValidationErrors, 
  categoryController.getCategoryById 
);

router.put("/updateCategory/:id", 
  validateCategoryId,
  validateCategory,
  handleValidationErrors,
  categoryController.updateCategory
);

router.delete("/deleteCategory/:id", 
  validateCategoryId,
  handleValidationErrors,
  categoryController.deleteCategory
);

module.exports = router;
