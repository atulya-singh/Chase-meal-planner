const axios = require('axios');
const cheerio = require('cheerio');   

async function getNutrition(recipeId){
    const url = `https://dining.unc.edu/wp-content/themes/nmc_dining/ajax-content/recipe.php?recipe=${recipeId}&hide_allergens=0`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data.html);
    const data = {};
    $('b').each((index, element) => {
        const text = $(element).parent().text();
        const key = $(element).text();
        const n=text.replace(key, '').trim();
        data[key] = n;
    });
    console.log(data);
    return data;
}
getNutrition('7507');
module.exports = { getNutrition };