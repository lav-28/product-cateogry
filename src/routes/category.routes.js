const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.get("/GetAllCategories", (req, res) =>
  categoryController.getAllCategories(req, res)
);

module.exports = router;
