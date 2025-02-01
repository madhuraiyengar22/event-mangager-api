const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const events = [
];

// Middleware for authentication
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// get all users
router.get("/api/v1/events", (req, res) => {
    res.send(events);
})

// Create event
router.post('/api/v1/events', authenticateToken, (req, res) => {
    if (req.user.role !== 'organizer') return res.sendStatus(403);

    const { date, time, description } = req.body;
    const newEvent = { id: Date.now(), date, time, description, participants: [] };
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// Update event
router.put('/api/v1/events/:id', authenticateToken, (req, res) => {
    if (req.user.role !== 'organizer') return res.sendStatus(403);

    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    const { date, time, description } = req.body;
    if (date) event.date = date;
    if (time) event.time = time;
    if (description) event.description = description;

    res.json(event);
});

// Delete event
router.delete('/api/v1/events/:id', authenticateToken, (req, res) => {
    if (req.user.role !== 'organizer') return res.sendStatus(403);

    const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
    if (eventIndex === -1) return res.status(404).json({ message: 'Event not found.' });

    events.splice(eventIndex, 1);
    res.status(204).send();
});

// Register for event
router.post('/api/v1/events/:id/register', authenticateToken, (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    if (event.participants.includes(req.user.id)) {
        return res.status(400).json({ message: 'User already registered for this event.' });
    }

    event.participants.push(req.user.id);
    res.json({ message: 'Registration successful.', event });
});

module.exports = router;