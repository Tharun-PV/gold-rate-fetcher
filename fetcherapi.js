const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;
const defaultCity = 'Salem';
const defaultCarat = '22k';
const defaultGrams = 1;

app.get('/goldrate', async (req, res) => {
  try {
    const url = `https://kp-hl-httpapi-prod.angelone.in/goldcalculator?city=${defaultCity}&carat=${defaultCarat}&grams=${defaultGrams}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const price = data?.data?.price;

    if (price) {
      const roundedPrice = Math.round(parseFloat(price));
      const caratText = defaultCarat.replace('k', ' carat');
      res.json({ message: `Today's ${caratText} gold rate is ${roundedPrice}` });
    } else {
      res.status(404).json({ error: 'Gold rate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
