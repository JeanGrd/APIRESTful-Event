const db = require('../db');

class Category {

    // Ajouter une nouvelle catégorie
    static create(name, description, callback) {
        const query = 'INSERT INTO CATEGORIES (NAME, DESCRIPTION) VALUES (?, ?)';
        db.query(query, [name, description], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    // Récupérer toutes les catégories
    static getAll(callback) {
        const query = 'SELECT * FROM CATEGORIES';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer une catégorie par son ID
    static getById(categoryId, callback) {
        const query = 'SELECT * FROM CATEGORIES WHERE CATEGORY_ID = ?';
        db.query(query, [categoryId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Mettre à jour une catégorie
    static update(categoryId, updatedCategory, callback) {
        const { name, description } = updatedCategory;
        const query = `
        UPDATE CATEGORIES
        SET NAME = ?, DESCRIPTION = ?
        WHERE CATEGORY_ID = ?`;
        db.query(query, [name, description, categoryId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Supprimer une catégorie
    static delete(categoryId, callback) {
        const query = 'DELETE FROM CATEGORIES WHERE CATEGORY_ID = ?';
        db.query(query, [categoryId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = Category;
