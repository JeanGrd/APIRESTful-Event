const db = require('../db');

class Participant {

    // Inscrire un participant à un événement
    static register(eventId, participantData, callback) {
        const query = 'INSERT INTO participants SET ?, event_id = ?';
        db.query(query, [participantData, eventId], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    }

    // Récupérer tous les participants d'un événement avec pagination
    static getAllByEventIdPage(eventId, searchTerm, page, callback) {
        const limit = 10;
        const offset = (page - 1) * limit;
        const search = `%${searchTerm}%`;
        const query = 'SELECT SQL_CALC_FOUND_ROWS id, first_name, last_name, email FROM participants WHERE event_id = ? AND email LIKE ? LIMIT ? OFFSET ?';
        const queryTotal = 'SELECT FOUND_ROWS() as total;';

        db.query(query, [eventId, search, limit, offset], (err, participants) => {
            if (err) return callback(err);

            db.query(queryTotal, [], (err, total) => {
                if (err) return callback(err);
                callback(null, { participants: participants, total: total[0].total });
            });
        });
    }

    // Récupérer tous les participants d'un événement par son ID
    static getAllByEventId(eventId, callback) {
        const query = 'SELECT * FROM participants WHERE event_id = ?';
        db.query(query, [eventId], callback);
    }

    // Obtenir le nombre total de participants pour un événement
    static getTotalParticipants(eventId, callback) {
        const query = 'SELECT COUNT(*) AS total FROM participants WHERE event_id = ?';
        db.query(query, [eventId], callback);
    }

    // Récupérer un participant par son ID et l'ID de l'événement
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

    // Supprimer tous les participants d'un événement par son ID
    static deleteParticipantsByEvent(id, callback) {
        const query = 'DELETE FROM participants WHERE event_id = ?;';
        db.query(query, [id], callback);
    }

    // Supprimer un participant par son ID
    static deleteParticipant(participantId, callback) {
        const query = 'DELETE FROM participants WHERE id = ?';
        db.query(query, [participantId], callback);
    }

    // Mettre à jour les informations d'un participant
    static updateParticipant(id, updatedParticipant, callback) {
        const { first_name, last_name, email, phone_number } = updatedParticipant;
        const query = `
        UPDATE participants
        SET first_name = ?, last_name = ?, email = ?, phone_number = ?
        WHERE id = ?`;
        db.query(query, [first_name, last_name, email, phone_number, id], callback);
    }

    // Obtenir la moyenne des participants pour tous les évènements
    static getAverageParticipants(eventId, callback) {
        const query = 'SELECT AVG(participant_count) AS average_participants ' +
            'FROM (SELECT event_id, COUNT(id) AS participant_count FROM participants GROUP BY event_id) p';
        db.query(query, [eventId], callback);
    }

}

module.exports = Participant;
