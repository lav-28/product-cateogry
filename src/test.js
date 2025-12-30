const { poolPromise } = require("./database");

(async () => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT name FROM sys.databases");

    console.log(result.recordset);
  } catch (err) {
    console.error(err);
  }
})();
