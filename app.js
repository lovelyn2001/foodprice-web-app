const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load food prices from JSON file
function loadFoodPrices() {
    const filePath = path.join(__dirname, 'foodPrices.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Routes
app.get('/', (req, res) => {
    const foodPrices = loadFoodPrices();
    res.render('index', { foodstuffs: foodPrices.foodstuffs });
});

app.post('/predict', (req, res) => {
    const foodPrices = loadFoodPrices();
    const selectedFood = foodPrices.foodstuffs.find(food => food.name === req.body.foodItem);
    res.render('result', { food: selectedFood });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
