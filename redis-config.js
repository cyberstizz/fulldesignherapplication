const { createClient } = require('redis');
const redisClient = createClient({ url: process.env.REDISCLOUD_URL });


redisClient.on('connect', () => console.log('Connected to Redis...'));
redisClient.on('error', (err) => console.log('Redis error:', err));

redisClient.connect().catch(console.error);

module.exports = redisClient;
