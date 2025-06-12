import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// For read-write actions
const rwClient = client.readWrite;

export default rwClient;
