const axios = require('axios');
const cheerio = require('cheerio');   

async function getNutrition(recipeId){
    const url = `https://dining.unc.edu/wp-content/themes/nmc_dining/ajax-content/recipe.php?recipe=${recipeId}&hide_allergens=0`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data.html);
    console.log($('b').text());
}
getNutrition('7507');
module.exports = { getNutrition };