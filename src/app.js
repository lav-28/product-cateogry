const express = require("express");
const { getAllCategories, addCategory } = require("./services/category.service");

const app = express();
app.use(express.json());

app.get("/categories", async (req, res) => {
  const categories = await getAllCategories();
  if (categories.length === 0)
    return res.status(404).json({ success: false, message: "No categories found" });
  res.json({ success: true, data: categories });
});

app.post("/categories", async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "CategoryName is required" });
  }
  const result = await addCategory(name, description);
  if (!result.success) {
    return res.status(500).json(result);
  } 
  res.status(201).json(result);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
