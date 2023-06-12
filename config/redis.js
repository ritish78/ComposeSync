const dotenv = require('dotenv');
dotenv.config();
const redis = require('redis');
dotenv.config();

const redisUrl = process.env.UPSTASH_REDIS_URL;


const redisClient = redis.createClient({
    url: redisUrl
});

redisClient.on('error', (error) => {
    throw error;
})

redisClient.on('connect', () => {
    console.log('Connected to Redis!');
})

async function connectRedis() {
    await redisClient.connect();
}

connectRedis();

module.exports = { connectRedis, redisClient };
