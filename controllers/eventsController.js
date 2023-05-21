const Event = require('../models/event');
const Participant = require("../models/participant");

// Récupération de tous les événements avec pagination et recherche
exports.getAllEvents = (req, res) => {
    const page = req.query.page || 1;
    const searchTerm = req.query.search || '';
    Event.getAll(page, searchTerm, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur est survenue lors de la récupération des événements."
            });
        } else {
            res.send(data);
        }
    });
};

// Récupérer tous les événements ouverts (non clôturés) avec pagination et recherche
exports.getAllOpenEvents = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const searchTerm = req.query.search || '';
    Event.getAllOpen(page, searchTerm, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error fetching events' });
        }
        res.json({ events: result.events, total: result.total });
    });
};

// Créer un nouvel événement
exports.createEvent = (req, res) => {
    const eventData = req.body;
    Event.create(eventData, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error creating event' });
        res.status(201).json({ message: 'Event created', eventId: result.insertId });
    });
};

// Récupérer un événement par ID
exports.getEventById = (req, res) => {
    const eventId = req.params.eventId;
    Event.getById(eventId, (err, event) => {
        if (err) return res.status(500).json({ error: 'Error fetching event' });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    });
};

// Vérifier si un événement est complet
exports.isFull = (req, res) => {
    const eventId = req.params.eventId;
    Event.isFull(eventId, (err, event) => {
        if (err) return res.status(500).json({ error: 'Error fetching event' });
        if (!event) return res.status(404).json({ error: 'Event not found' });
        res.json(event);
    });
};

// Supprimer un événement par ID
exports.deleteEventById = (req, res) => {
    const eventId = req.params.eventId;

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

// Obtenir le nombre total d'événements
exports.getTotalEvent = (req, res) => {
    Event.getTotalEvent((err, events) => {
        if (err) return res.status(500).json({ error: 'Error fetching events' });
        res.json(events);
    });
};