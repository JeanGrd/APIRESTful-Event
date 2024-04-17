const Unit = require('../models/Unit');

exports.createUnit = (req, res) => {
    const { productId, supplierId, expirationDate, purchasePrice, salePrice } = req.body;
    Unit.create(productId, supplierId, expirationDate, purchasePrice, salePrice, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error creating unit", error: err });
        } else {
            res.status(201).send({ message: "Unit created successfully", unitId: result.insertId });
        }
    });
};

exports.getAllUnits = (req, res) => {
    Unit.getAll((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving units", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getUnitById = (req, res) => {
    const unitId = req.params.unitId;
    Unit.getById(unitId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving unit", error: err });
        } else if (!result) {
            res.status(404).send({ message: "Unit not found" });
        } else {
            res.status(200).json(result);
        }
    });
};

exports.updateUnit = (req, res) => {
    const unitId = req.params.unitId;
    const updatedUnit = req.body;
    Unit.update(unitId, updatedUnit, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error updating unit", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Unit not found" });
        } else {
            res.status(200).send({ message: "Unit updated successfully" });
        }
    });
};

exports.deleteUnit = (req, res) => {
    const unitId = req.params.unitId;
    Unit.delete(unitId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error deleting unit", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Unit not found" });
        } else {
            res.status(200).send({ message: "Unit deleted successfully" });
        }
    });
};
