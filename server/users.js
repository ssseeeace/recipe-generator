const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const db = require('./config');
const router = express.Router();

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

router.post('/register', async (req, res) => {
    const { username, password, dietary_restrictions, health_goals, food_preferences } = req.body;

    try {
        const userExists = await db.oneOrNone('SELECT id FROM users WHERE username = $1', [username]);

        if (userExists) {
            return res.status(409).json({ error: "Username already taken." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await db.one(
            'INSERT INTO users (username, password, dietary_restrictions, health_goals, food_preferences) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [username, hashedPassword, dietary_restrictions, health_goals, food_preferences]
        );

        res.json({ id: newUser.id, username: username });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const payload = { userId: user.id, username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token: token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all users (for testing purposes) - Protected route
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const users = await db.any('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
