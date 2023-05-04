const db = require('../db');

class Participant {

    static register(event_id, participantData, callback) {
        const query = 'INSERT INTO participants SET ?, event_id = ?';
        db.query(query, [participantData, event_id], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    static getByEventId(eventId, callback) {
        const query = 'SELECT * FROM participants WHERE event_id = ?';
        db.query(query, [eventId], callback);
    }

    static getTotalParticipantsByEventId(eventId, callback) {
        const query = 'SELECT COUNT(*) AS participant_count FROM participants WHERE event_id = ?';
        db.query(query, [eventId], callback);
    }

    static getParticipantByEventId(eventId, participantId, callback) {
        const sql = 'SELECT * FROM participants WHERE id = ? AND event_id = ?';
        db.query(sql, [participantId, eventId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    static deleteParticipantsByEvent(id, callback) {
        const query = 'DELETE FROM participants WHERE event_id = ?;';
        db.query(query, [id], callback);
    }

    static deleteParticipant(participantId, callback) {
        const query = 'DELETE FROM participants WHERE id = ?';
        db.query(query, [participantId], callback);
    }

    static updateParticipant(id, updatedParticipant, callback) {
        const { first_name, last_name, email, phone_number } = updatedParticipant;
        const query = `
        UPDATE participants
        SET first_name = ?, last_name = ?, email = ?, phone_number = ?
        WHERE id = ?`;
        db.query(query, [first_name, last_name, email, phone_number, id], callback);
    }

}

module.exports = Participant;
