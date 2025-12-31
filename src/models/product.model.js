const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Category = require('./category.model');

const Product = sequelize.define('Product', 
{
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ProductName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  ProductDescription: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ProductPrice: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'CategoryId'
    }
  },
}, {
  tableName: 'Products',
  timestamps: false
});

// Define associations
Product.belongsTo(Category, {
  foreignKey: "CategoryId",
  as: "category",
});

Category.hasMany(Product, {
  foreignKey: "CategoryId",
  as: "products",
});

module.exports = Product;