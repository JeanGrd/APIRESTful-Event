const db = require('../db');
const bcrypt = require('bcrypt');

const saltRounds = 10;

class Admin {
    static getByUsername(username, callback) {
        const query = 'SELECT * FROM admins WHERE username = ?';
        db.query(query, [username], callback);
    }

    static checkPassword(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
    }

    static create(username, password, callback) {
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const query = 'INSERT INTO admins (username, password) VALUES (?, ?)';
        db.query(query, [username, hashedPassword], callback);
    }
}

module.exports = Admin;
