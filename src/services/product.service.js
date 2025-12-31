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

module.exports = { getAllProducts };