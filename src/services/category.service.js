const { poolPromise } = require("../database"); 

async function getAllCategories() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Categories");
    return result.recordset;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function addCategory(name, description) {
  try {
    const pool = await poolPromise;

    const duplicateCheck = await pool.request()
      .input("name", name)
      .query("SELECT COUNT(*) AS count FROM Categories WHERE CategoryName = @name");

    if (duplicateCheck.recordset[0].count > 0) {
      return { 
        success: false,
        message: "Category already exists" 
      };
    }

    await pool.request()
      .input("name", name)
      .input("description", description)
      .query(`
        INSERT INTO Categories (CategoryName, CategoryDescription)
        VALUES (@name, @description)
      `);
    return { success: true, message: "Category added successfully" }; // ✅ RETURN!
  } catch (err) {
    console.error(err);
    return { 
      success: false, 
      message: err.message 
    };
  }
}

async function getCategoryById(categoryId) {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("categoryId", categoryId)
      .query("SELECT * FROM Categories WHERE CategoryId = @categoryId");
    return result.recordset[0];
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = { getAllCategories, addCategory, getCategoryById };