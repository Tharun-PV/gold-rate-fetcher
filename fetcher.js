async function getGoldRate(city = "Salem", carat = "22k", grams = 1) {
    try {
      const url = `https://kp-hl-httpapi-prod.angelone.in/goldcalculator?city=${city}&carat=${carat}&grams=${grams}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const price = data?.data?.price;
  
      if (price) {
        const roundedPrice = Math.round(parseFloat(price));
        const caratText = carat.replace('k', ' carat');
        console.log(`Today's ${caratText} gold rate is ${roundedPrice}`);
      } else {
        console.log("Gold rate not found");
      }
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }
  
  getGoldRate();
  