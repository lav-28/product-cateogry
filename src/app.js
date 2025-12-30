const express = require("express");
const { getAllCategories, addCategory } = require("./services/category.Service");

const app = express();
app.use(express.json());

app.get("/categories", async (req, res) => {
  const categories = await getAllCategories();
  if (categories.length === 0)
    return res.status(404).json({ success: false, message: "No categories found" });
  res.json({ success: true, data: categories });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
