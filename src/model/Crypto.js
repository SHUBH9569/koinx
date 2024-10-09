const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
    id: String,
    name: String,
    price_usd: Number,
    market_cap_usd: Number,
    price_change_24h: Number,
    last_updated: Date
  });
  
module.exports = mongoose.model('Crypto', cryptoSchema);