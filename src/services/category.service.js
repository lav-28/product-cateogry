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

async function updateCategory(categoryId, name, description) {
  try {
    const pool = await poolPromise;

    const categoryExists = await pool.request()
      .input("categoryId", categoryId)
      .query("SELECT COUNT(*) AS count FROM Categories WHERE CategoryId = @categoryId");

    if (categoryExists.recordset[0].count === 0) {
      return {
        success: false,
        message: "Category not found"
      };
    }

    const duplicateCheck = await pool.request()
      .input("name", name)
      .query("SELECT COUNT(*) AS count FROM Categories WHERE CategoryName = @name");

    if (duplicateCheck.recordset[0].count > 0) {
      return {
        success: false,
        message: "Category already exists"
      };
    }

    const result = await pool.request()
    
      .input("categoryId", categoryId)
      .input("name", name)
      .input("description", description)
      .query("UPDATE Categories SET CategoryName = @name, CategoryDescription = @description WHERE CategoryId = @categoryId");
    return { 
      success: true, 
      message: "Category updated successfully" 
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function deleteCategory(categoryId) {
  try{
    const pool = await poolPromise;

    const categoryExists = await pool.request()
      .input("categoryId", categoryId)
      .query("SELECT COUNT(*) AS count FROM Categories WHERE CategoryId = @categoryId");

    if (categoryExists.recordset[0].count === 0) {
      return {
        success: false,
        message: "Category not found"
      };
    }

    await pool.request()
      .input("categoryId", categoryId)
      .query("DELETE FROM Categories WHERE CategoryId = @categoryId");
    return { 
      success: true, 
      message: "Category deleted successfully" 
    };
  }catch(err){
    console.error(err);
    return { 
      success: false, 
      message: err.message 
    };
  }
}

module.exports = { getAllCategories, addCategory, getCategoryById, updateCategory, deleteCategory };