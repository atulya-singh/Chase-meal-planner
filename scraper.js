const axios = require('axios');


async function getMenu(){
    const url ='https://dining.unc.edu/locations/chase/'

    const response = await axios.get(url);
    console.log(response.data)
}


getMenu();