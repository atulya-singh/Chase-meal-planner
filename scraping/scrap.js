const cheerio = require('cheerio');
const { getMenu } = require('./scraper.js');
const { getNutrition } = require('./nutrition.js');
require('dotenv').config({ path: '../.env' });
const { pool } = require('../backend/database.js');

async function ScrapeMenu() {
  const menu = await getMenu();
  const $ = cheerio.load(menu);
  const menuItems = $('a.show-nutrition').toArray();

  for (const element of menuItems) {
    const name = $(element).text();
    const recipeId = $(element).attr('data-recipe');
    const nutrition = await getNutrition(recipeId);

    await pool.query(
      `INSERT INTO recipes (recipe_id, name, calories, total_fat, cholesterol, sodium, total_carbohydrate, protein, calcium, iron, potassium, vitamin_d)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (recipe_id) DO NOTHING`,
      [
        recipeId,
        name,
        nutrition['Calories'],
        nutrition['Total Fat'],
        nutrition['Cholesterol'],
        nutrition['Sodium'],
        nutrition['Total Carbohydrate'],
        nutrition['Protein'],
        nutrition['Calcium'],
        nutrition['Iron'],
        nutrition['Potassium'],
        nutrition['Vitamin D']
      ]
    );

    console.log(`Inserted: ${name}`);
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('Done! All items in database.');
}

ScrapeMenu().catch(console.error);
module.exports = { ScrapeMenu };