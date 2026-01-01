const express = require("express");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const db = require("./models");

const app = express();
app.use(express.json());
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Test database connection
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
});

module.exports = app;