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

    static isFull(id, callback) {
        const query = `
            SELECT
                events.id,
                events.max_participants,
                COUNT(participants.id) AS current_participants,
                (events.max_participants <= COUNT(participants.id)) AS is_full
            FROM
                events
            LEFT JOIN
                participants ON events.id = participants.event_id
            WHERE
                events.id = ?
            GROUP BY
                events.id
        `;
        db.query(query, [id], callback);
    }
}


module.exports = Event;
