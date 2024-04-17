const db = require('../db');

class Product {

    // Ajouter un nouveau produit
    static create(name, categoryId, callback) {
        const query = 'INSERT INTO PRODUCTS (NAME, CATEGORY_ID) VALUES (?, ?)';
        db.query(query, [name, categoryId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    // Récupérer tous les produits
    static getAll(callback) {
        const query = 'SELECT p.PRODUCT_ID, p.NAME, c.NAME AS CATEGORY_NAME FROM PRODUCTS p JOIN CATEGORIES c ON p.CATEGORY_ID = c.CATEGORY_ID';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer un produit par son ID
    static getById(productId, callback) {
        const query = 'SELECT p.PRODUCT_ID, p.NAME, c.NAME AS CATEGORY_NAME FROM PRODUCTS p JOIN CATEGORIES c ON p.CATEGORY_ID = c.CATEGORY_ID WHERE p.PRODUCT_ID = ?';
        db.query(query, [productId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Mettre à jour un produit
    static update(productId, updatedProduct, callback) {
        const { name, categoryId } = updatedProduct;
        const query = `
        UPDATE PRODUCTS
        SET NAME = ?, CATEGORY_ID = ?
        WHERE PRODUCT_ID = ?`;
        db.query(query, [name, categoryId, productId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Supprimer un produit
    static delete(productId, callback) {
        const query = 'DELETE FROM PRODUCTS WHERE PRODUCT_ID = ?';
        db.query(query, [productId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = Product;
