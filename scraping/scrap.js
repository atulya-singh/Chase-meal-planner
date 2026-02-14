const cheerio = require('cheerio');
const { getMenu } = require('./scraper.js');
const { getNutrition } = require('./nutrition.js');
const fs = require('fs');
async function ScrapeMenu() {
  const menu = await getMenu();
  const $ = cheerio.load(menu);
  const menuItems = $('a.show-nutrition').toArray();
  const allItems = [];

  for (const element of menuItems) {
    const name = $(element).text();
    const recipeId = $(element).attr('data-recipe');
    const nutrition = await getNutrition(recipeId);

    allItems.push({ name, recipeId, ...nutrition });

    // 200ms delay between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const jsonstring = JSON.stringify(allItems, null, 2);
  fs.writeFileSync('Menu.json', jsonstring);
  return jsonstring;
}

ScrapeMenu();
module.exports = { ScrapeMenu };