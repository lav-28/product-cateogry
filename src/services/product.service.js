const { poolPromise } = require("../database");

async function getAllProducts() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Products");
    return result.recordset;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getProductById(productId) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("productId", productId)
      .query("SELECT * FROM Products WHERE ProductId = @productId");
    return result.recordset[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function addProduct(name, description, price, categoryId) {
  try {
    const pool = await poolPromise;

    const categoryCheck = await pool.request()
      .input("categoryId", categoryId)
      .query("SELECT COUNT(*) AS count FROM Categories WHERE CategoryId = @categoryId");

    if (categoryCheck.recordset[0].count === 0) {
      return {
        success: false,
        message: "Category does not exist"
      };
    }

    const duplicateCheck = await pool.request()
      .input("name", name)
      .input("categoryId", categoryId)
      .query("SELECT COUNT(*) AS count FROM Products WHERE ProductName = @name AND CategoryId = @categoryId");

    if (duplicateCheck.recordset[0].count > 0) {
      return {
        success: false,
        message: "Product already exists in this category"
      };
    }  
    await pool.request()
      .input("name", name)
      .input("description", description)
      .input("price", price)
      .input("categoryId", categoryId)
      .query("INSERT INTO Products (ProductName, ProductDescription, ProductPrice, CategoryId) VALUES (@name, @description, @price, @categoryId)");
    return { 
        success: true, 
        message: "Product added successfully" 
    };
  } catch (err) {
    console.error(err);
    return { 
        success: false, 
        message: err.message 
    };
  }
}

module.exports = { getAllProducts, getProductById, addProduct };