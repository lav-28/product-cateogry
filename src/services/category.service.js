const { poolPromise } = require("../database"); 
const Category = require("../models/category.model");
const { Op } = require("sequelize");

class CategoryService {
  async getAllCategories() {

    try{
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(categoryId) {
    try {
      const category = await Category.findByPk(categoryId);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async addCategory(name, description) {
    try {
      const category = await Category.create({
        CategoryName: name,
        CategoryDescription: description,
      });
      return {
        success: true,
        message: "Category added successfully",
      };
    } catch (error) {
      if(error.name === 'SequelizeUniqueConstraintError'){
        return {
          success: false,
          message: "Category already exists.",
        };
      }
      throw error;
    }
  }

  async updateCategory(categoryId, name, description) {
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return {
          success: false,
          message: "Category not found.",
        };
      }

      const duplicate = await Category.findOne({
        where: {
          CategoryName: name,
          CategoryId: { [Op.ne]: categoryId },
        },
      });

      if (duplicate) {
        return {
          success: false,
          message: "Category already exists",
        };
      }

      await category.update({
        name: name,
        description: description,
      });

      return {
        success: true,
        message: "Category updated successfully",
      };
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  async deleteCategory(categoryId) {
    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return {
          success: false,
          message: "Category not found.",
        };
      }

      await category.destroy();

      return {
        success: true,
        message: "Category deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}

module.exports = new CategoryService();