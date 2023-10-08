CREATE TABLE IF NOT EXISTS meal_plans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    date DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS meal_plan_recipes (
    meal_plan_id INTEGER REFERENCES meal_plans(id),
    recipe_id INTEGER REFERENCES recipes(id),
    PRIMARY KEY (meal_plan_id, recipe_id)
);
