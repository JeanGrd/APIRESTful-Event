const Statistics = require('../models/Statistics');

exports.getTotalUnitsInStock = (req, res) => {
    Statistics.getTotalUnitsInStock((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving stock levels", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getProductsExpiringSoon = (req, res) => {
    Statistics.getProductsExpiringSoon((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving products expiring soon", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getSupplierActivity = (req, res) => {
    Statistics.getSupplierActivity((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving supplier activity", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};
