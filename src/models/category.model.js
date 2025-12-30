const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Category = sequelize.define("Category", {
  categoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  categoryName: {
    type: DataTypes.STRING(50), // [StringLength(50)]
    allowNull: false            // [Required]
  },

  categoryDescription: {
    type: DataTypes.STRING,
    allowNull: true
  }

}, {
  tableName: "Categories",
  timestamps: false
});

module.exports = Category;
