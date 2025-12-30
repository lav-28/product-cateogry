const categoryService = require("../services/category.service");

class CategoryController {
  async getAllCategories(req, res) {
    const response = await categoryService.getAllCategory();

    if (!response.success) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  }
}

module.exports = new CategoryController();
