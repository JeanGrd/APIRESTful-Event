const db = require('../db');

class Stats {
    static getTotalEvent(callback) {
        const query = 'SELECT COUNT(*) AS event_count FROM events';
        db.query(query, callback);
    }

    static getAverageParticipants(callback) {
        const query = 'SELECT AVG(participant_count) AS average_participants ' +
            'FROM (SELECT event_id, COUNT(id) AS participant_count FROM participants GROUP BY event_id) p';
        db.query(query, callback);
    }

    static getTotalParticipants(eventId, callback) {
        const query = 'SELECT COUNT(*) as total FROM participants WHERE event_id = ?';
        db.query(query, [eventId], callback);
    }

}

module.exports = Stats;
