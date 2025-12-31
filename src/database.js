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


// Create a pool and export it
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    return pool;
  })
  .catch(err => {
    console.error("❌ DB connection failed:", err);
  });

module.exports = { sql, poolPromise };


// CREATE TABLE Categories (
//     CategoryId INT IDENTITY(1,1) PRIMARY KEY,
//     CategoryName NVARCHAR(50) NOT NULL,
//     CategoryDescription NVARCHAR(MAX)
// );

// CREATE TABLE Products (
//     ProductId INT IDENTITY(1,1) PRIMARY KEY,
//     ProductName NVARCHAR(50) NOT NULL,
//     ProductDescription NVARCHAR(MAX) NOT NULL,
//     ProductPrice DECIMAL(10,2) NOT NULL,
//     CategoryId INT NOT NULL,
//     CONSTRAINT FK_Products_Categories
//         FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId)
// );
