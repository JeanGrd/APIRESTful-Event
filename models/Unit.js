const db = require('../db');

class Unit {

    // Ajouter une nouvelle unité de produit
    static create(productId, supplierId, expirationDate, purchasePrice, salePrice, callback) {
        const query = 'INSERT INTO UNITS (PRODUCT_ID, SUPPLIER_ID, EXPIRATION_DATE, PURCHASE_PRICE, SALE_PRICE) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [productId, supplierId, expirationDate, purchasePrice, salePrice], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    // Récupérer toutes les unités
    static getAll(callback) {
        const query = 'SELECT u.UNIT_ID, p.NAME AS PRODUCT_NAME, s.NAME AS SUPPLIER_NAME, u.EXPIRATION_DATE, u.PURCHASE_PRICE, u.SALE_PRICE FROM UNITS u JOIN PRODUCTS p ON u.PRODUCT_ID = p.PRODUCT_ID JOIN SUPPLIERS s ON u.SUPPLIER_ID = s.SUPPLIER_ID';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer une unité par son ID
    static getById(unitId, callback) {
        const query = 'SELECT u.UNIT_ID, p.NAME AS PRODUCT_NAME, s.NAME AS SUPPLIER_NAME, u.EXPIRATION_DATE, u.PURCHASE_PRICE, u.SALE_PRICE FROM UNITS u JOIN PRODUCTS p ON u.PRODUCT_ID = p.PRODUCT_ID JOIN SUPPLIERS s ON u.SUPPLIER_ID = s.SUPPLIER_ID WHERE u.UNIT_ID = ?';
        db.query(query, [unitId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Mettre à jour une unité
    static update(unitId, updatedUnit, callback) {
        const { productId, supplierId, expirationDate, purchasePrice, salePrice } = updatedUnit;
        const query = `
        UPDATE UNITS
        SET PRODUCT_ID = ?, SUPPLIER_ID = ?, EXPIRATION_DATE = ?, PURCHASE_PRICE = ?, SALE_PRICE = ?
        WHERE UNIT_ID = ?`;
        db.query(query, [productId, supplierId, expirationDate, purchasePrice, salePrice, unitId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Supprimer une unité
    static delete(unitId, callback) {
        const query = 'DELETE FROM UNITS WHERE UNIT_ID = ?';
        db.query(query, [unitId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = Unit;
