const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Category = require("./category.model");

const Product = sequelize.define("Product", {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "Products",
  timestamps: false
});

// Relationships (EF Core equivalent)
Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Product;
