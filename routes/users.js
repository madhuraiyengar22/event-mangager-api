const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

const users = [
];

// get all users
router.get("/api/v1/users", (req, res) => {
    res.send(users);
})

// register new user
router.post('/api/v1/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), name, email, password: hashedPassword, role: role || 'attendee' };
        users.push(newUser);
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.' });
    }
});

router.post('/api/v1/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(400).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.' });
    }
});

module.exports = router;
