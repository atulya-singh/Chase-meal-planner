require('dotenv').config();
const express = require('express');
const{pool} = require('../backend/database.js');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const app = express();
const PORT=3000;
app.use(express.json());

app.post('/api/mealplan', async (req, res)=>{
  try{
    const{ calories, protein, diet }= req.body;
    const result = await pool.query('SELECT * FROM recipes');
    const menu =result.rows;

    const prompt =`
      You are a meal planning assistant for a college dining hall.
      
      Here is today's full menu with nutrition info:
      ${JSON.stringify(menu)}

      Create a meal plan for someone who wants:
      - ${calories} calories per day
      - At least ${protein}g protein per day
      - Diet preference: ${diet}

      Rules:
      - Use ONLY items from the menu above
      - Create meals for breakfast, lunch, and dinner
      - Pick realistic meal combinations (ignore condiments and toppings on their own)
      - Show the items in each meal with their calories and protein
      - Show a total for each meal and a grand total for the day
      - Keep the total within 100 calories of the target
    `;

    const model =genAI.getGenerativeModel({model : 'gemini-2.0-flash'});
    const response = await model.generateContent(prompt);

    res.json({mealplan : response.response.text()});
  } catch(error){
    console.error('Error generating meal plan:', error);
    res.status(500).json({ error: 'Failed to generate meal plan' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});