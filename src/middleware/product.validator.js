const { body, param, validationResult } = require("express-validator");

const validateProduct = [
  body("name")
    .trim()
    .notEmpty().withMessage("ProductName is required")
    .isLength({ max: 100 }).withMessage("ProductName must not exceed 100 characters"),
    body("description")
    .trim()
    .notEmpty().withMessage("ProductDescription is required")
    .isLength({ max: 255 }).withMessage("ProductDescription must not exceed 255 characters"),
    body("price")
    .notEmpty().withMessage("ProductPrice is required")
    .isFloat({ gt: 0 }).withMessage("ProductPrice must be a positive number"),
    body("categoryId")
    .notEmpty().withMessage("CategoryId is required")
    .isInt({ gt: 0 }).withMessage("CategoryId must be a positive integer"),
];

const validateProductId = [
  param("id")
    .isInt({ gt: 0 }).withMessage("ProductId must be a positive integer"),
];
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
        success: false,
        message: `Validation failed! ${errors.array().map(err => err.msg).join(', ')}`,
    });
  }
  next();
}

module.exports = {
  validateProduct,
  validateProductId,
  handleValidationErrors
};