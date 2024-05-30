const Product = require('../models/Product');

exports.createProduct = (req, res) => {
    const { name, categoryId } = req.body;
    Product.create(name, categoryId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error creating product", error: err });
        } else {
            res.status(201).send({ message: "Product created successfully", productId: result.insertId });
        }
    });
};

exports.getAllProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving products", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getProductById = (req, res) => {
    const productId = req.params.productId;
    Product.getById(productId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving product", error: err });
        } else if (result.length === 0) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

exports.updateProduct = (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = req.body;
    Product.update(productId, updatedProduct, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error updating product", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(200).send({ message: "Product updated successfully" });
        }
    });
};

exports.deleteProduct = (req, res) => {
    const productId = req.params.productId;
    Product.delete(productId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error deleting product", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(200).send({ message: "Product deleted successfully" });
        }
    });
};

// In productController.js

exports.getCategoryIdByProductId = (req, res) => {
    const productId = req.params.productId;
    Product.getCategoryId(productId, (err, categoryId) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving category ID", error: err });
        } else {
            res.send({ categoryId });
        }
    });
};

