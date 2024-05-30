const Supplier = require('../models/Supplier');

exports.createSupplier = (req, res) => {
    const { name, address, phone } = req.body;
    Supplier.create(name, address, phone, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error creating supplier", error: err });
        } else {
            res.status(201).send({ message: "Supplier created successfully", supplierId: result.insertId });
        }
    });
};

exports.getAllSuppliers = (req, res) => {
    Supplier.getAll((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving suppliers", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getSupplierById = (req, res) => {
    const supplierId = req.params.supplierId;
    Supplier.getById(supplierId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving supplier", error: err });
        } else if (result.length === 0) {
            res.status(404).send({ message: "Supplier not found" });
        } else {
            res.status(200).json(result[0]);
        }
    });
};

exports.updateSupplier = (req, res) => {
    const supplierId = req.params.supplierId;
    const updatedSupplier = req.body;
    Supplier.update(supplierId, updatedSupplier, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error updating supplier", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Supplier not found" });
        } else {
            res.status(200).send({ message: "Supplier updated successfully" });
        }
    });
};

exports.deleteSupplier = (req, res) => {
    const supplierId = req.params.supplierId;
    Supplier.delete(supplierId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error deleting supplier", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Supplier not found" });
        } else {
            res.status(200).send({ message: "Supplier deleted successfully" });
        }
    });
};

exports.getSupplierIdByName = (req, res) => {
    const supplierName = req.params.name;
    Supplier.getIdByName(supplierName, (err, supplierId) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ supplierId });
    });
};
