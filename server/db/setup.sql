CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    dietary_restrictions TEXT,
    health_goals TEXT,
    food_preferences TEXT
);
