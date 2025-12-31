const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("ShopDB", "sa", "PmcIndia@123", {
    host: "PMCLAP1613-1222",
    dialect: "mssql",
    dialectOptions: {
        options: {
            encrypt: false,
            trustServerCertificate: true,
        },
    },
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
  },
});

// Test connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

testConnection();

module.exports = sequelize;


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
