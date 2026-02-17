require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initDB() {
  // Drop old tables so we can recreate with correct columns
  await pool.query(`DROP TABLE IF EXISTS daily_menu`);
  await pool.query(`DROP TABLE IF EXISTS recipes`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS recipes (
      recipe_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      calories TEXT,
      total_fat TEXT,
      cholesterol TEXT,
      sodium TEXT,
      total_carbohydrate TEXT,
      protein TEXT,
      calcium TEXT,
      iron TEXT,
      potassium TEXT,
      vitamin_d TEXT
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS daily_menu (
      id SERIAL PRIMARY KEY,
      recipe_id TEXT REFERENCES recipes(recipe_id),
      meal_period TEXT,
      date_served DATE,
      UNIQUE(recipe_id, meal_period, date_served)
    )
  `);

  console.log('Tables created successfully!');
}

initDB().catch(console.error);
module.exports = { pool };