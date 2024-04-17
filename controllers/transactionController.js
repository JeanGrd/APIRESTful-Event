const Transaction = require('../models/Transaction');

exports.createTransaction = (req, res) => {
    const { unitId, transactionType, transactionDate, transactionPrice } = req.body;
    Transaction.create(unitId, transactionType, transactionDate, transactionPrice, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error creating transaction", error: err });
        } else {
            res.status(201).send({ message: "Transaction created successfully", transactionId: result.insertId });
        }
    });
};

exports.getAllTransactions = (req, res) => {
    Transaction.getAll((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving transactions", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getTransactionById = (req, res) => {
    const transactionId = req.params.transactionId;
    Transaction.getById(transactionId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving transaction", error: err });
        } else if (!result) {
            res.status(404).send({ message: "Transaction not found" });
        } else {
            res.status(200).json(result);
        }
    });
};

exports.updateTransaction = (req, res) => {
    const transactionId = req.params.transactionId;
    const updatedTransaction = req.body;
    Transaction.update(transactionId, updatedTransaction, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error updating transaction", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Transaction not found" });
        } else {
            res.status(200).send({ message: "Transaction updated successfully" });
        }
    });
};

exports.deleteTransaction = (req, res) => {
    const transactionId = req.params.transactionId;
    Transaction.delete(transactionId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error deleting transaction", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Transaction not found" });
        } else {
            res.status(200).send({ message: "Transaction deleted successfully" });
        }
    });
};
