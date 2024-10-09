const axios = require('axios');
const { COINGECKO_API_URL } = require('../config/environment.js');

const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  const url = `${COINGECKO_API_URL}/coins/markets`;
  
  try {
    const response = await axios.get(url, {
      params: {
        vs_currency: 'usd',
        ids: coins.join(','),
        order: 'market_cap_desc',
        per_page: 3,
        page: 1,
        sparkline: false
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    return null;
  }
};

module.exports = { fetchCryptoData };