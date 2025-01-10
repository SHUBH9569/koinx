import { getLastNPrices } from '../services/cryptoService.js';
import { calculateStandardDeviation}  from '../utils/mathUtils.js';

export const getDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin parameter is required' });
  }

  const validCoins = ['bitcoin', 'matic-network', 'ethereum'];
  if (!validCoins.includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin. Must be one of: bitcoin, matic-network, ethereum' });
  }

  try {
    const prices = await getLastNPrices(coin, 100);
    console.log('Prices:', prices);
    if (prices.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified coin' });
    }

    const deviation = calculateStandardDeviation(prices);

    res.json({
      deviation: parseFloat(deviation.toFixed(2))
    });
  } catch (error) {
    console.error('Error calculating deviation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

