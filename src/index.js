const express = require('express');
const cron = require('node-cron');
const { connectDatabase } = require('./config/database.js');
const { PORT } = require('./config/environment.js');
const { updateDatabase } = require('./services/cryptoService.js');
const cryptoRoutes = require('./routes/cryptoRoutes.js');
const deviationRoutes = require('./routes/deviationRoutes.js');

const app = express();

// Connect to database
connectDatabase();

// Schedule job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
  console.log('Running scheduled job to fetch crypto data');
  await updateDatabase();
});

// Routes
app.use(cryptoRoutes);
app.use(deviationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


