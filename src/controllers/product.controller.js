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
       
        const result = await productService.addProduct(name, description, price, categoryId);

        if (!result.success) {
            let status = result.message === "Product already exists" ? 409 : 500;
            if(result.message === "Category does not exist"){
                status = 400;
            }
            return res.status(status).json(result);
        }

        return res.status(201).json(result);
    }

    async updateProduct(req, res) {
        const productId = req.params.id;
        const { name, description, price, categoryId } = req.body;

        const result = await productService.updateProduct(productId, name, description, price, categoryId);

        if (!result.success) {
            const status = result.message === "Product already exists" ? 409 : 500;
            return res.status(status).json(result);
        }
        return res.status(200).json(result);
    }

    async deleteProduct(req, res) {
        const productId = req.params.id;
        const result = await productService.deleteProduct(productId);
        
        if (!result.success) {
            const status = result.message === "Product not found." ? 404 : 500;
            return res.status(status).json(result);
        }
        return res.status(200).json(result);
    }
}

module.exports = new ProductController();