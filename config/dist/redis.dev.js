"use strict";

var dotenv = require('dotenv');

dotenv.config();

var redis = require('redis');

dotenv.config();
var redisUrl = process.env.UPSTASH_REDIS_URL;
var redisClient = redis.createClient({
  url: redisUrl
});
redisClient.on('error', function (error) {
  throw error;
});
redisClient.on('connect', function () {
  console.log('Connected to Redis!');
});

function connectRedis() {
  return regeneratorRuntime.async(function connectRedis$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(redisClient.connect());

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

connectRedis();
module.exports = {
  connectRedis: connectRedis,
  redisClient: redisClient
};