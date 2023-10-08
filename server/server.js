// Import required modules
require('dotenv').config();
const db = require('./config');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');



// Initialize the Express app
const app = express();
const PORT = 3001;

// Middleware for parsing JSON
app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Format is: "Bearer <token>"

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden, invalid token
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);  // Unauthorized
    }
};

// Import routes
const userRoutes = require('./users');
const recipeRoutes = require('./recipes');
const mealPlanRoutes = require('./mealplans');

// Use routes in the app
app.use('/users', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/mealplans', authenticateJWT, mealPlanRoutes);

// Test endpoints
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/testdb', async (req, res) => {
    try {
        const result = await db.any('SELECT NOW()');
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
