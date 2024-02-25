const { createClient } = require('redis');
const redisClient = createClient({ url: process.env.REDISCLOUD_URL });


module.exports = redisClient;
