const { Category } = require("../models");
const Product = require("../models/product.model");
const { Op } = require("sequelize");

class ProductService {
  async getAllProducts() {
    try {
      const products = await Product.findAll();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findByPk(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async addProduct(name, description, price, categoryId) {
    try {
      const categoryExists = await Category.findByPk(categoryId);
      if (!categoryExists) {
        return {
          success: false,
          message: "Category does not exist",
        };
      }
      
      const product = await Product.create({
        ProductName: name,
        ProductDescription: description,
        ProductPrice: price,
        CategoryId: categoryId
      });
      return {
        success: true,
        message: "Product added successfully",
      };
    } catch (error) {
      if(error.name === 'SequelizeUniqueConstraintError'){
        return {
          success: false,
          message: "Product already exists",
        };
      }
      throw error;
    }
  }

  async updateProduct(productId, name, description, price, categoryId) {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return {
          success: false,
          message: "Product not found.",
        };
      }
      const duplicate = await Product.findOne({
        where: {
          ProductName: name,
          CategoryId: categoryId,
          ProductId: { [Op.ne]: productId },
        },
      });
      if (duplicate) {
        return {
          success: false,
          message: "Product already exists",
        };
      }

      await product.update({
        ProductName: name,
        ProductDescription: description,
        ProductPrice: price,
        CategoryId: categoryId
      });

      return {
        success: true,
        message: "Product updated successfully",
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteProduct(productId) {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return {
          success: false,
          message: "Product not found",
        };
      }

      await product.destroy();
      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();