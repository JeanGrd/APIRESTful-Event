const db = require('../db');

class Event {
    static getAll(callback) {
        const query = 'SELECT * FROM events';
        db.query(query, callback);
    }

    static getOpenEvents(callback) {
        const query = 'SELECT * FROM events WHERE registration_end_date > CURDATE()';
        db.query(query, callback);
    }

    static create(eventData, callback) {
        const query = 'INSERT INTO events SET ?';
        db.query(query, eventData, callback);
    }

    static getById(id, callback) {
        const query = 'SELECT * FROM events WHERE id = ?';
        db.query(query, [id], callback);
    }

    static deleteEventById(id, callback) {
        const query = 'DELETE FROM events WHERE id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Event;
