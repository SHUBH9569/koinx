import express from 'express';
import { schedule } from 'node-cron';
import { connectDatabase } from './config/database.js';
import { PORT } from './config/environment.js';
import { updateDatabase } from './services/cryptoService.js';
import cryptoRoutes from './routes/cryptoRoutes.js';
import deviationRoutes from './routes/deviationRoutes.js';

const app = express();

// Connect to database
connectDatabase();

// Schedule job to run every 2 hours
schedule('* */2 * * *', async () => {
  console.log('Running scheduled job to fetch crypto data');
  await updateDatabase();
});

// Routes
app.use(cryptoRoutes);
app.use(deviationRoutes);

app.get('/', (req, res) => {
  res.json({'message': 'running fine'});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});