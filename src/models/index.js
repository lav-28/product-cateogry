const sequelize = require('../database');
const Category = require('./category.model');
const Product = require('./product.model');

const db = {
  sequelize,
  Category,
  Product,
};

module.exports = db;    