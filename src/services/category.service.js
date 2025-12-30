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
    await pool.request()
      .input("name", name)
      .input("description", description)
      .query(`
        INSERT INTO Categories (CategoryName, CategoryDescription)
        VALUES (@name, @description)
      `);
    console.log("Category added successfully");
    return { success: true, message: "Category added successfully" }; // ✅ RETURN!
  } catch (err) {
    console.error(err);
    return { success: false, message: err.message };
  }
}

module.exports = { getAllCategories, addCategory };
