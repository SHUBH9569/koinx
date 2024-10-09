import { Schema, model } from "mongoose";

const cryptoSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price_usd: { type: Number, required: true },
  market_cap_usd: { type: Number, required: true },
  price_change_24h: { type: Number, required: true },
  last_updated: { type: Date, required: true },
});

export default model("Crypto", cryptoSchema);
