const db = require('../db');

class Event {

    // Récupérer tous les événements avec pagination et recherche
    static getAll(page, searchTerm, callback) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const search = `%${searchTerm}%`;
        const query = 'SELECT SQL_CALC_FOUND_ROWS id, event_name, description FROM events WHERE event_name LIKE ? LIMIT ? OFFSET ?';
        const queryTotal = 'SELECT FOUND_ROWS() as total;';

        db.query(query, [search, limit, offset], (err, events) => {
            if (err) return callback(err);

            db.query(queryTotal, [], (err, total) => {
                if (err) return callback(err);
                callback(null, { events: events, total: total[0].total });
            });
        });
    }

    // Récupérer tous les événements ouverts (non clôturés) avec pagination
    static getAllOpen(page, searchTerm, callback) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const search = `%${searchTerm}%`;
        const query = 'SELECT SQL_CALC_FOUND_ROWS id, event_name, description FROM events WHERE registration_end_date > CURDATE() AND (event_name LIKE ? OR description LIKE ?) LIMIT ? OFFSET ?';
        const queryTotal = 'SELECT FOUND_ROWS() as total;';

        db.query(query, [search, search, limit, offset], (err, events) => {
            if (err) return callback(err);

            db.query(queryTotal, [], (err, total) => {
                if (err) return callback(err);
                callback(null, { events: events, total: total[0].total });
            });
        });
    }



    // Créer un nouvel événement
    static create(eventData, callback) {
        const query = 'INSERT INTO events SET ?';
        db.query(query, eventData, callback);
    }

    // Récupérer un événement par ID
    static getById(id, callback) {
        const query = 'SELECT * FROM events WHERE id = ?';
        db.query(query, [id], callback);
    }

    // Supprimer un événement par ID
    static deleteEventById(id, callback) {
        const query = 'DELETE FROM events WHERE id = ?';
        db.query(query, [id], callback);
    }

    // Vérifier si un événement est complet
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

    // Obtenir le nombre total d'événements
    static getTotalEvent(callback) {
        const query = 'SELECT COUNT(*) AS event_count FROM events';
        db.query(query, callback);
    }

}

module.exports = Event;
