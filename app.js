const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventController = require('./controllers/eventsController');
const participantController = require('./controllers/participantsController');
const adminController = require('./controllers/adminsController');
const statsController = require("./controllers/statsController");

const app = express();
module.exports = app;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Admin routes
app.post('/admin/login', adminController.login);
app.post('/admin/register', adminController.register);

// Event routes
app.get('/events', eventController.getAllEvents);
app.get('/events/open', eventController.getAllOpenEvents);
app.post('/events', eventController.createEvent);
app.get('/events/:id', eventController.getEventById);
app.delete('/events/:id', eventController.deleteEventById);
app.get('/events/:id/isfull', eventController.isFull);

// Participant routes
app.post('/events/:eventId/participants', participantController.register);
app.get('/events/:eventId/total', participantController.getTotalParticipantsByEventId);
app.get('/events/:eventId/participants', participantController.getAllByEventId);
app.get('/events/:eventId/participants/:participantId', participantController.getParticipantByEventId);
app.put('/events/:eventId/participants/:participantId', participantController.updateParticipant);
app.delete('/events/:eventId/participants/:participantId', participantController.deleteParticipant);

app.get('/stats/total', statsController.getTotalEvent)
app.get('/stats/average', statsController.getAverageParticipants)
app.get('/stats/:eventId/total', statsController.getTotalParticipants)

