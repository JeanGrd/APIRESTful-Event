/*
-----------------------------------
Project: MiageEvent
Written by: Jean Guiraud
-----------------------------------
 */

// Importation des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventController = require('./controllers/eventsController');
const participantController = require('./controllers/participantsController');
const adminController = require('./controllers/adminsController');

// Création de l'application Express
const app = express();
module.exports = app;

// Utilisation des middlewares pour gérer les requêtes entrantes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes pour les administrateurs
app.post('/auth/login', adminController.login); // Authentification de l'administrateur
app.post('/auth/register', adminController.register); // Enregistrement d'un nouvel administrateur

// Routes pour les événements
app.get('/events', eventController.getAllEvents); // Récupération de tous les événements avec pagination et recherche
app.get('/events/open', eventController.getAllOpenEvents); // Récupération des événements ouverts avec pagination et recherche
app.get('/events/total', eventController.getTotalEvent); // Récupération du nombre total d'événements
app.get('/events/:eventId', eventController.getEventById); // Récupération d'un événement par son ID
app.get('/events/:eventId/isfull', eventController.isFull); // Vérification si un événement est complet
app.delete('/events/:eventId', eventController.deleteEventById); // Suppression d'un événement par son ID
app.post('/events', eventController.createEvent); // Création d'un nouvel événement

// Routes pour les participants
app.get('/events/participants/average', participantController.getAverageParticipants); // Récupération de la moyenne des participants de tous les événements
app.get('/events/:eventId/participants', participantController.getAllByEventId); // Récupération de tous les participants d'un événement par son ID
app.get('/events/:eventId/participants-page', participantController.getAllByEventIdPages); // Récupération des participants d'un événement avec pagination et recherche
app.get('/events/:eventId/participants/total', participantController.getTotalParticipants); // Récupération du nombre total de participants pour un événement
app.get('/events/:eventId/participants/:participantId', participantController.getParticipantByEventId); // Récupération d'un participant par son ID et l'ID de l'événement
app.post('/events/:eventId/participants', participantController.register); // Inscription d'un participant à un événement
app.put('/events/:eventId/participants/:participantId', participantController.updateParticipant); // Mise à jour des informations d'un participant
app.delete('/events/:eventId/participants/:participantId', participantController.deleteParticipant); // Suppression d'un participant
