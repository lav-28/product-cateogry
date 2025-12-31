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

    async getProductById(req, res) {
        const productId = req.params.id;
        if(!productId){
          return res.status(400).json({
            success: false,
            message: "Product ID is required.",
          });
        }

        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product,
        });
    }

    async addProduct(req, res) {
        const { name, description, price, categoryId } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Product name is required.",
            });
        }
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Product description is required.",
            });
        }
        if (!price) {
            return res.status(400).json({
                success: false,
                message: "Product price is required.",
            });
        }
        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Product's category ID is required.",
            });
        }

        const result = await productService.addProduct(name, description, price, categoryId);

        if (!result.success) {
            const status = result.message === "Product already exists in this category" ? 409 : 500;
            return res.status(status).json(result);
        }

        return res.status(201).json(result);
    }
}

module.exports = new ProductController();