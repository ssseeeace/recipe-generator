const express = require('express');
const axios = require('axios');
const db = require('./config');
const router = express.Router();

router.get('/search-edamam', async (req, res) => {
    const { query } = req.query;
    console.log("Backend received query parameter:", query);

    try {
        console.log("Attempting to access /search-edamam");


        const response = await axios.get('https://api.edamam.com/search', {
            params: {
                q: query,
                app_id: process.env.EDAMAM_APP_ID,
                app_key: process.env.EDAMAM_APP_KEY,


            }

        });

        console.log("Backend received from Edamam API:", response.data.hits);
        res.json(response.data.hits);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
router.post('/add', async (req, res) => {
    const { title, ingredients, instructions, image_url, dietary_notes } = req.body;

    try {
        const newRecipe = await db.one(
            'INSERT INTO recipes (user_id, title, ingredients, instructions, image_url, dietary_notes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [req.user.userId, title, ingredients, instructions, image_url, dietary_notes]
        );

        res.json({ id: newRecipe.id, title: title });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const recipes = await db.any('SELECT * FROM recipes WHERE user_id = $1', [req.user.userId]);
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
