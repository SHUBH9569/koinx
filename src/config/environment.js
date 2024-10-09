require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI,
  COINGECKO_API_URL: 'https://api.coingecko.com/api/v3',
};