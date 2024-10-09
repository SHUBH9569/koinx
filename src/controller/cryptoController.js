import {getLatestCryptoData} from '../services/cryptoService.js';

export const getStats = async (req, res) => {
  const { coin } = req.query;
  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  const validCoins = ['bitcoin', 'matic-network', 'ethereum'];

  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin. Must be one of: bitcoin, matic-network, ethereum' });
  }

  try {
    const coinData = await getLatestCryptoData(coin);

    if (!coinData) {
      return res.status(404).json({ error: 'Coin data not found' });
    }

    res.json({
      price: coinData.price_usd,
      marketCap: coinData.market_cap_usd,
      "24hChange": coinData.price_change_24h
    });

  } catch (error) {
    console.error('Error fetching coin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

