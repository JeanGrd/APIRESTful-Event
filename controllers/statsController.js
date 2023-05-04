const Stats = require('../models/stats');
const Event = require("../models/event");

exports.getTotalEvent = (req, res) => {
    Stats.getTotalEvent((err, events) => {
        if (err) return res.status(500).json({ error: 'Error fetching events' });
        res.json(events);
    });
};

exports.getAverageParticipants = (req, res) => {
    Stats.getAverageParticipants((err, events) => {
        if (err) return res.status(500).json({ error: 'Error fetching events' });
        res.json(events);
    });
};


exports.getTotalParticipants = (req, res) => {
    const eventId = req.params.eventId;
    Stats.getTotalParticipants(eventId, (err, event) => {
        if (err) return res.status(500).json({ error: 'Error fetching participant' });
        if (!event) return res.status(404).json({ error: 'Participant not found' });
        res.json(event);
    });
};

