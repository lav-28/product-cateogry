const express = require("express");
const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
app.use(express.json());
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
