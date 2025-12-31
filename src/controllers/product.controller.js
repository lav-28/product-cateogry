const productService = require("../services/product.service");

class ProductController {

    async getAllProducts(req, res) {

        const products = await productService.getAllProducts();

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No record found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    }
}

module.exports = new ProductController();