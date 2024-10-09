const Crypto = require('../model/Crypto.js');
const { fetchCryptoData } = require('./coinGeckoService.js');

const updateDatabase = async () => {
  const data = await fetchCryptoData();
  if (!data) return;

  for (const coin of data) {
    try {
      await Crypto.findOneAndUpdate(
        { id: coin.id },
        {
          name: coin.name,
          price_usd: coin.current_price,
          market_cap_usd: coin.market_cap,
          price_change_24h: coin.price_change_24h,
          last_updated: new Date()
        },
        { upsert: true, new: true }
      );
      console.log(`Updated data for ${coin.name}`);
    } catch (error) {
      console.error(`Error updating data for ${coin.name}:`, error);
    }
  }
};

const getLatestCryptoData = async (coinId) => {
  return await Crypto.findOne({ id: coinId });
};

const getLastNPrices = async (coinId, n) => {
  const data = await Crypto.find({ id: coinId })
    .sort({ last_updated: -1 })
    .limit(n)
    .select('price_usd');
  return data.map(record => record.price_usd);
};

module.exports = { updateDatabase, getLatestCryptoData, getLastNPrices };