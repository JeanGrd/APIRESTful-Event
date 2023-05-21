const db = require('../db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class Admin {
    // Récupérer un administrateur par son nom d'utilisateur
    static getByUsername(username, callback) {
        const query = 'SELECT * FROM admins WHERE username = ?';
        db.query(query, [username], callback);
    }

    // Vérifier le mot de passe en le comparant au mot de passe haché stocké dans la base de données
    static checkPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }

    // Créer un nouvel administrateur avec un mot de passe haché
    static create(username, password, callback) {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const query = 'INSERT INTO admins (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], callback);
    }
}

module.exports = Admin;
