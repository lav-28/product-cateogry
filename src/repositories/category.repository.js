const Category = require("../models/category.model");

class CategoryRepository {
  async getAll() {
    return await Category.findAll(); 
  }
}

module.exports = new CategoryRepository();
