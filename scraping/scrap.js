const cheerio = require('cheerio');
const { getMenu } = require('./scraper.js');

async function ScrapeMenu(){
    const menu = await getMenu();
    const $ = cheerio.load(menu);
    const menuItems = $('a.show-nutrition');
    menuItems.each((index, element) => {
        const name = $(element).text();
        const recipeId = $(element).attr('data-recipe');
        console.log(name, recipeId);
      });
}
ScrapeMenu();
module.exports = { ScrapeMenu };
