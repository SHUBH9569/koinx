import axios from 'axios';
import { COINGECKO_API_URL } from '../config/environment.js';

export const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  const url = `${COINGECKO_API_URL}/coins/markets`;
  
  try {
    const response = await axios.get(url, {
      params: {
        vs_currency: "usd",
        ids: coins.join(','),
        order: 'market_cap_desc',
        per_page: 3,
        page: 1,
        sparkline: false
      },
      headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.API_KEY}
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
    return null;
  }
};

export default { fetchCryptoData };