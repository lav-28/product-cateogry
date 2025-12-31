const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.get("/GetAllCategories", (req, res) => {
  categoryController.getAllCategories(req, res)
});
router.post("/addCategory",(req, res) => {
  categoryController.addCategory(req, res)
}); 
router.get("/GetCategoryById/:id", (req, res) => {
  categoryController.getCategoryById(req, res)
});
router.put("/updateCategory/:id", (req, res) => {
  categoryController.updateCategory(req, res)
});
router.delete("/deleteCategory/:id", (req, res) => {
  categoryController.deleteCategory(req, res)
});
module.exports = router;
