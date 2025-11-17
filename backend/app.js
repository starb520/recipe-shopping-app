const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/ingredients', (req, res, next) => {
    const ingredient = req.body;
    console.log(ingredient);
    res.status(201).json({
        message: 'Recipe added successfully'
    });
});

app.use('/api/ingredients', (req, res, next) => {
  const ingredients = [
    { name: 'First Ingredient', amount: 2 },
    { name: 'Second Ingredient', amount: 44},
  ];
  res.status(200).json({
    message: 'Ingredients fetched successfully!',
    ingredients: ingredients,
  });
});

module.exports = app;
