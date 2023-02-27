require('dotenv').config();
const { COINGECKO_API_URL_BASE } = process.env;
const fetch = require('node-fetch');

async function convertService(amount, from, to)
{
    try{
        const requestPrice = await fetch(`${COINGECKO_API_URL_BASE}/price?ids=${from}&vs_currencies=${to}`);
        const responsePrice = await requestPrice.json();
        const price = responsePrice[from][to];
    
        return amount * price;
    }
    catch(e)
    {
        return console.log(`somethings wrong ${e.message}`)
    }
}

module.exports = {
    convertService : convertService
}