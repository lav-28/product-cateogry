const { body, param, validationResult } = require('express-validator');

const validateCategory = [
    body('name')
    .trim()
    .notEmpty().withMessage('CategoryName is required')
    .isLength({ max: 50 }).withMessage('CategoryName must not exceed 50 characters'),
    body('description')
    .trim()
    .notEmpty().withMessage('CategoryDescription is required')
    .isLength({ max: 255 }).withMessage('CategoryDescription must not exceed 255 characters'),
];

const validateCategoryId = [
    param('id')
    .isInt({ gt: 0 }).withMessage('CategoryId must be a positive integer'),
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
    validateCategory,
    validateCategoryId,
    handleValidationErrors
};