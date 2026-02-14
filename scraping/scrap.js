const cheerio = require('cheerio');
const { getMenu } = require('./scraper');

async function ScrapeMenu(){
    const menu = await getMenu();
    const $ = cheerio.load(menu);
    const menuItems = $('a.show-nutrition');
    console.log(menuItems);
}

ScrapeMenu();
