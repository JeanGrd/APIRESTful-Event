const db = require('../db');

class Transaction {

    // Ajouter une nouvelle transaction
    static create(unitId, transactionType, transactionDate, transactionPrice, callback) {
        const query = 'INSERT INTO TRANSACTIONS (UNIT_ID, TRANSACTION_TYPE, TRANSACTION_DATE, TRANSACTION_PRICE) VALUES (?, ?, ?, ?)';
        db.query(query, [unitId, transactionType, transactionDate, transactionPrice], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    // Récupérer toutes les transactions
    static getAll(callback) {
        const query = 'SELECT t.TRANSACTION_ID, u.UNIT_ID, p.NAME AS PRODUCT_NAME, t.TRANSACTION_TYPE, t.TRANSACTION_DATE, t.TRANSACTION_PRICE FROM TRANSACTIONS t JOIN UNITS u ON t.UNIT_ID = u.UNIT_ID JOIN PRODUCTS p ON u.PRODUCT_ID = p.PRODUCT_ID';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer une transaction par son ID
    static getById(transactionId, callback) {
        const query = 'SELECT t.TRANSACTION_ID, u.UNIT_ID, p.NAME AS PRODUCT_NAME, t.TRANSACTION_TYPE, t.TRANSACTION_DATE, t.TRANSACTION_PRICE FROM TRANSACTIONS t JOIN UNITS u ON t.UNIT_ID = u.UNIT_ID JOIN PRODUCTS p ON u.PRODUCT_ID = p.PRODUCT_ID WHERE t.TRANSACTION_ID = ?';
        db.query(query, [transactionId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Mettre à jour une transaction
    static update(transactionId, updatedTransaction, callback) {
        const { unitId, transactionType, transactionDate, transactionPrice } = updatedTransaction;
        const query = `
        UPDATE TRANSACTIONS
        SET UNIT_ID = ?, TRANSACTION_TYPE = ?, TRANSACTION_DATE = ?, TRANSACTION_PRICE = ?
        WHERE TRANSACTION_ID = ?`;
        db.query(query, [unitId, transactionType, transactionDate, transactionPrice, transactionId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Supprimer une transaction
    static delete(transactionId, callback) {
        const query = 'DELETE FROM TRANSACTIONS WHERE TRANSACTION_ID = ?';
        db.query(query, [transactionId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = Transaction;
