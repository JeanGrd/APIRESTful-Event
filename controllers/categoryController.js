const Category = require('../models/Category');

exports.createCategory = (req, res) => {
    const { name, description } = req.body;
    Category.create(name, description, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error creating category", error: err });
        } else {
            res.status(201).send({ message: "Category created successfully", categoryId: result.insertId });
        }
    });
};

exports.getAllCategories = (req, res) => {
    Category.getAll((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving categories", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getCategoryById = (req, res) => {
    const categoryId = req.params.categoryId;
    Category.getById(categoryId, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving category", error: err });
        } else if (results.length === 0) {
            res.status(404).send({ message: "Category not found" });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

exports.updateCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    const updatedCategory = req.body;
    Category.update(categoryId, updatedCategory, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error updating category", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Category not found" });
        } else {
            res.status(200).send({ message: "Category updated successfully" });
        }
    });
};

exports.deleteCategory = (req, res) => {
    const categoryId = req.params.categoryId;
    Category.delete(categoryId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error deleting category", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Category not found" });
        } else {
            res.status(200).send({ message: "Category deleted successfully" });
        }
    });
};
