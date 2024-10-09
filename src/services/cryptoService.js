import db from '../model/Crypto.js';
import { fetchCryptoData } from './coinGeckoService.js';

export const updateDatabase = async () => {
  const data = await fetchCryptoData();
  console.log(data);
  if (!data) return;

  for (const coin of data) {
    try {
      await db.findOneAndUpdate(
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

export const getLatestCryptoData = async (coinId) => {
  return await db.findOne({ id: coinId });
};

export const getLastNPrices = async (coinId, n) => {
  const data = await db.find({ id: coinId })
    .sort({ last_updated: -1 })
    .limit(n)
    .select('price_usd');
  return data.map(record => record.price_usd);
};

export default { updateDatabase, getLatestCryptoData, getLastNPrices };