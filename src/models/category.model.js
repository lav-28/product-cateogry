const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Category = sequelize.define('Category', {
  CategoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CategoryName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: {
        msg: 'Category name already exists'
    }
  },
  CategoryDescription: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'Categories',
  timestamps: false
});

module.exports = Category;