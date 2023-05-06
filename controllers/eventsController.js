const Event = require('../models/event');
const Participant = require("../models/participant");

exports.getAllEvents = (req, res) => {
    Event.getAll((err, events) => {
        if (err) return res.status(500).json({ error: 'Error fetching events' });
        res.json(events);
    });
};

exports.getOpenEvents = (req, res) => {
    Event.getOpenEvents((err, events) => {
        if (err) return res.status(500).json({ error: 'Error fetching open events' });
        res.json(events);
    });
};

exports.createEvent = (req, res) => {
    const eventData = req.body;
    Event.create(eventData, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error creating event' });
        res.status(201).json({ message: 'Event created', eventId: result.insertId });
    });
};

exports.getEventById = (req, res) => {
    const eventId = req.params.id;
    Event.getById(eventId, (err, event) => {
        if (err) return res.status(500).json({ error: 'Error fetching event' });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    });
};

exports.isFull = (req, res) => {
    const eventId = req.params.id;
    Event.isFull(eventId, (err, event) => {
        if (err) return res.status(500).json({ error: 'Error fetching event' });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    });
};

exports.deleteEventById = (req, res) => {
    const eventId = req.params.id;

    // Supprimer les participants liés à l'événement
    Participant.deleteParticipantsByEvent(eventId, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error deleting participants' });

        // Supprimer l'événement lui-même
        Event.deleteEventById(eventId, (err, result) => {
            if (err) return res.status(500).json({ error: 'Error deleting event' });
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Event not found' });
            res.json({ message: 'Event deleted', eventId });
        });
    });
};

