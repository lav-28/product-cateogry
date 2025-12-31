const categoryService = require("../services/category.service");

class CategoryController {

  async getAllCategories(req, res) {

    const categories = await categoryService.getAllCategories();

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No record found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Categories retrieved successfully",
      data: categories,
    });
  }
  async addCategory(req, res) {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Category description is required.",
      });
    }
    const result = await categoryService.addCategory(name, description);

    if (!result.success) {
      const status = result.message === "Category already exists" ? 409 : 500;
      return res.status(status).json(result);
    }

    return res.status(201).json(result);
  }
  async getCategoryById(req, res) {
    const categoryId = req.params.id;
    // Implementation for fetching category by ID can be added here 
    if(!categoryId){
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  }
  async getCategoryById(req, res) {
    const categoryId = req.params.id;
    if(!categoryId){
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: category,
    });
  }
}



module.exports = new CategoryController();
