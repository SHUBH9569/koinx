import {config} from 'dotenv';
config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI;
export const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';