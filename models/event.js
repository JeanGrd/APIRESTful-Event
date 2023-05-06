const db = require('../db');

class Event {

    static getAll(page, callback) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const query = 'SELECT SQL_CALC_FOUND_ROWS * FROM events LIMIT ? OFFSET ?';
        const queryTotal = 'SELECT FOUND_ROWS() as total;';

        db.query(query, [limit, offset], (err, events) => {
            if (err) return callback(err);

            db.query(queryTotal, [], (err, total) => {
                if (err) return callback(err);
                callback(null, { events: events, total: total[0].total });
            });
        });
    }


    static getAllOpen(page, callback) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const query = 'SELECT SQL_CALC_FOUND_ROWS * FROM events WHERE registration_end_date > CURDATE() LIMIT ? OFFSET ?';
        const queryTotal = 'SELECT FOUND_ROWS() as total;';

        db.query(query, [limit, offset], (err, events) => {
            if (err) return callback(err);

            db.query(queryTotal, [], (err, total) => {
                if (err) return callback(err);
                callback(null, { events: events, total: total[0].total });
            });
        });
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
