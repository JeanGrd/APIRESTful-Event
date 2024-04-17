const db = require('../db');
const bcrypt = require('bcryptjs');

class User {

    // Créer un nouvel utilisateur
    static create(newUser, callback) {
        // Hasher le mot de passe avant de l'enregistrer en base de données
        bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
            if (err) return callback(err);
            const query = 'INSERT INTO USERS (EMAIL, PASSWORD) VALUES (?, ?)';
            db.query(query, [newUser.email, hashedPassword], (err, result) => {
                if (err) return callback(err);
                callback(null, { userId: result.insertId });
            });
        });
    }

    // Récupérer tous les utilisateurs
    static getAll(callback) {
        const query = 'SELECT USER_ID, EMAIL FROM USERS';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer un utilisateur par son ID
    static getById(userId, callback) {
        const query = 'SELECT USER_ID, EMAIL FROM USERS WHERE USER_ID = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Mettre à jour un utilisateur
    static update(userId, updatedUser, callback) {
        // Si le mot de passe doit être mis à jour
        if (updatedUser.password) {
            bcrypt.hash(updatedUser.password, 10, (err, hashedPassword) => {
                if (err) return callback(err);
                const query = 'UPDATE USERS SET EMAIL = ?, PASSWORD = ? WHERE USER_ID = ?';
                db.query(query, [updatedUser.email, hashedPassword, userId], (err, result) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
            });
        } else {
            const query = 'UPDATE USERS SET EMAIL = ? WHERE USER_ID = ?';
            db.query(query, [updatedUser.email, userId], (err, result) => {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    }

    // Supprimer un utilisateur
    static delete(userId, callback) {
        const query = 'DELETE FROM USERS WHERE USER_ID = ?';
        db.query(query, [userId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

}

module.exports = User;
