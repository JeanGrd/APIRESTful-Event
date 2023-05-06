const Participant = require('../models/participant');
const Event = require("../models/event");

exports.register = (req, res) => {
    const eventId = req.params.eventId;
    const participantData = req.body;

    Event.getById(eventId, (err, event) => {
        if (err) return res.status(500).json({ error: 'Error fetching event' });
        if (!event) return res.status(404).json({ error: 'Event not found' });

        Participant.getTotalParticipantsByEventId(eventId, (err, result) => {
            if (err) return res.status(500).json({ error: 'Error fetching participant count' });

            if (result && result[0] && result[0].participant_count < event[0].max_participants) {
                // Ajouter le participant à l'événement, car la capacité n'est pas encore dépassée.
                Participant.register(eventId, participantData, (err, result) => {
                    if (err){
                        console.log(err);
                        return res.status(500).json({ error: 'Error registering participant' });
                    }
                    res.status(201).json({ message: 'Participant registered', participantId: result.insertId });
                });
            } else {
                // Ne pas ajouter le participant, car la capacité maximale est atteinte.
                res.status(400).json({ error: 'Event capacity reached' });
            }
        });
    });
};


exports.getParticipantsByEventId = (req, res) => {
    const eventId = req.params.eventId;
    Participant.getByEventId(eventId, (err, participants) => {
        if (err) return res.status(500).json({ error: 'Error fetching participants' });
        res.json(participants);
    });
};

exports.getAllByEventId = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const eventId = req.params.eventId;
    Participant.getAllByEventId(eventId, page, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error fetching participants' });
        }
        res.json({ participants: result.participants, total: result.total });
    });
}

exports.getTotalParticipantsByEventId = (req, res) => {
    const eventId = req.params.eventId;
    Participant.getTotalParticipantsByEventId(eventId, (err, participants) => {
        if (err) return res.status(500).json({ error: 'Error fetching participants' });
        res.json(participants);
    });
};

exports.getParticipantByEventId = (req, res) => {
    const eventId = req.params.eventId;
    const participantId = req.params.participantId;
    Participant.getParticipantByEventId(eventId, participantId, (err, participants) => {
        if (err) return res.status(500).json({ error: 'Error fetching participants' });
        res.json(participants);
    });
};

exports.updateParticipant = (req, res) => {
    const participantId = req.params.participantId;
    const updatedParticipant = req.body;

    Participant.updateParticipant(participantId, updatedParticipant, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error updating Participant' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Participant not found' });
        res.status(200).json({ message: 'Participant updated', participantId: participantId, updatedParticipant });
    });
};

exports.deleteParticipant = (req, res) => {
    const participantId = req.params.participantId;
    Participant.deleteParticipant(participantId, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error delete Participant' });
        res.status(201).json({ message: 'Participant deleted', participantId: result.insertId });
    });
};

