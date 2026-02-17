require('dotenv').config({path: '../.env'});
console.log('DB URL', process.env.DATABASE_URL);
const {Pool}= require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function initDB(){
await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes(
    recipe_id TEXT PRIMARY KEY,
name TEXT NOT NULL,
calories INTEGER,
protein TEXT, 
total_fat TEXT,
carbs TEXT,
sodium TEXT,
dietary_tags TEXT
)
    `);

await pool.query(`
    CREATE TABLE IF NOT EXISTS daily_menu(
    id SERIAL PRIMARY KEY,
    recipe_id TEXT REFERENCES recipes(recipe_id),
    meal_period TEXT,
    station TEXT,
    date_served DATE
    )
`);
console.log('Tables created successfully!')
}

initDB().catch(console.error);

module.exports ={Pool};