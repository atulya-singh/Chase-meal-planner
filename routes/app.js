const express = require('express');
const  app= express();
const PORT=3000;

const jsondata = require('../scraping/Menu.json');

app.get('/', (req, res)=>{
    res.json(jsondata);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});