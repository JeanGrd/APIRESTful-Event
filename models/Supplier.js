const db = require('../db');

class Supplier {

    // Ajouter un nouveau fournisseur
    static create(name, address, phone, callback) {
        const query = 'INSERT INTO SUPPLIERS (NAME, ADDRESS, PHONE) VALUES (?, ?, ?)';
        db.query(query, [name, address, phone], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    // Récupérer tous les fournisseurs
    static getAll(callback) {
        const query = 'SELECT * FROM SUPPLIERS';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer un fournisseur par son ID
    static getById(supplierId, callback) {
        const query = 'SELECT * FROM SUPPLIERS WHERE SUPPLIER_ID = ?';
        db.query(query, [supplierId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Mettre à jour un fournisseur
    static update(supplierId, updatedSupplier, callback) {
        const { name, address, phone } = updatedSupplier;
        const query = `
        UPDATE SUPPLIERS
        SET NAME = ?, ADDRESS = ?, PHONE = ?
        WHERE SUPPLIER_ID = ?`;
        db.query(query, [name, address, phone, supplierId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Supprimer un fournisseur
    static delete(supplierId, callback) {
        const query = 'DELETE FROM SUPPLIERS WHERE SUPPLIER_ID = ?';
        db.query(query, [supplierId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = Supplier;
