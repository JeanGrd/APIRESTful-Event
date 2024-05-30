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
        const query = 'SELECT \n' +
            '    p.PRODUCT_ID, \n' +
            '    p.NAME, \n' +
            '    c.CATEGORY_ID, \n' +
            '    c.NAME AS CATEGORY_NAME, \n' +
            '    c.DESCRIPTION AS CATEGORY_DESCRIPTION,\n' +
            '    COUNT(u.UNIT_ID) AS QUANTITY\n' +
            'FROM \n' +
            '    PRODUCTS p\n' +
            'JOIN \n' +
            '    CATEGORIES c ON p.CATEGORY_ID = c.CATEGORY_ID\n' +
            'LEFT JOIN \n' +
            '    UNITS u ON p.PRODUCT_ID = u.PRODUCT_ID\n' +
            'GROUP BY \n' +
            '    p.PRODUCT_ID, p.NAME, c.CATEGORY_ID, c.NAME, c.DESCRIPTION;';
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
        const query = 'SELECT \n' +
            '    p.PRODUCT_ID, \n' +
            '    p.NAME, \n' +
            '    c.CATEGORY_ID, \n' +
            '    c.NAME AS CATEGORY_NAME, \n' +
            '    c.DESCRIPTION,\n' +
            '    COUNT(u.UNIT_ID) AS QUANTITY\n' +
            'FROM \n' +
            '    PRODUCTS p\n' +
            'JOIN \n' +
            '    CATEGORIES c ON p.CATEGORY_ID = c.CATEGORY_ID\n' +
            'LEFT JOIN \n' +
            '    UNITS u ON p.PRODUCT_ID = u.PRODUCT_ID\n' +
            'WHERE \n' +
            '    p.PRODUCT_ID = ?\n' +
            'GROUP BY \n' +
            '    p.PRODUCT_ID, p.NAME, c.CATEGORY_ID, c.NAME, c.DESCRIPTION;\n';
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

    static getCategoryId(productId, callback) {
        const query = 'SELECT CATEGORY_ID FROM PRODUCTS WHERE PRODUCT_ID = ?';
        db.query(query, [productId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                // results is an array of rows, you need to check if we have at least one row
                if (results.length > 0) {
                    callback(null, results[0].CATEGORY_ID); // Return the first row's CATEGORY_ID
                } else {
                    callback(new Error("No product found with the given ID"), null);
                }
            }
        });
    }

}

module.exports = Product;
