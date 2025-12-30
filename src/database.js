const sql = require("mssql");

const config = {
  user: "sa",
  password: "PmcIndia@123",
  server: "PMCLAP1613-1222",   // same machine
  database: "ShopDB",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    networkLibrary: "DBMSSOCN" // Named Pipes
  }
};

const poolPromise = sql.connect(config)
  .then(pool => {
    console.log("Connected to SQL Server successfully");
    return pool;
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });

module.exports = { sql, poolPromise };
