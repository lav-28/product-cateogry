const { poolPromise } = require("../database"); 
const Category = require("../models/category.model");
class CategoryService {
  async getAllCategories() {

    try{
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();