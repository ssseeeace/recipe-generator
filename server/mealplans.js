const express = require('express');
const db = require('./config');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { date, recipeIds } = req.body;

    try {
        // Create a new meal plan
        const mealPlan = await db.one(
            'INSERT INTO meal_plans (user_id, date) VALUES ($1, $2) RETURNING id',
            [req.user.userId, date]
        );

        // Associate recipes with the meal plan using the junction table
        for (let recipeId of recipeIds) {
            await db.none('INSERT INTO meal_plan_recipes (meal_plan_id, recipe_id) VALUES ($1, $2)', [mealPlan.id, recipeId]);
        }

        res.json({ id: mealPlan.id, date: date });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/', async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const mealPlans = await db.any(
            'SELECT * FROM meal_plans WHERE user_id = $1 AND date BETWEEN $2 AND $3 ORDER BY date',
            [req.user.userId, startDate, endDate]
        );

        res.json(mealPlans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/update/:id', async (req, res) => {
    const mealPlanId = req.params.id;
    const { recipeIds } = req.body;

    try {
        // Delete previous recipe associations for this meal plan
        await db.none('DELETE FROM meal_plan_recipes WHERE meal_plan_id = $1', [mealPlanId]);

        // Add new associations
        for (let recipeId of recipeIds) {
            await db.none('INSERT INTO meal_plan_recipes (meal_plan_id, recipe_id) VALUES ($1, $2)', [mealPlanId, recipeId]);
        }

        res.json({ message: "Meal plan updated successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/shopping-list', async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const mealPlans = await db.any(
            'SELECT recipe_id FROM meal_plan_recipes WHERE meal_plan_id IN (SELECT id FROM meal_plans WHERE user_id = $1 AND date BETWEEN $2 AND $3)',
            [req.user.userId, startDate, endDate]
        );

        const recipeIds = mealPlans.map(mp => mp.recipe_id);
        const recipes = await db.any('SELECT ingredients FROM recipes WHERE id = ANY($1::int[])', [recipeIds]);

        // Consolidate ingredients
        let shoppingList = [];
        recipes.forEach(recipe => {
            shoppingList = [...shoppingList, ...recipe.ingredients.split(', ')];
        });

        res.json(shoppingList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
