const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const { redisClient } = require("../config/redis");
const { MAX_REQ_ALLOWED_OF_AUTH_USER_PER_MINUTE, MAX_REQ_ALLOWED_OF_NOT_SIGNEDIN_PER_MINUTE, WINDOW_SIZE_IN_SECONDS } = require('./../config/constants');

const rateLimiter = async (req, res, next) => {
    //First, we check if the user is authorized
    let token = req.header('jwt-token');
    
    //Just a small token verification. If not verified, we remove the token.
    //If JWT is not verified it throws error and we set token to null.
    try {
       jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        token = null;
    }


    let ttl;
    if (token) {    
    
        const numberOfRequestByAuthorizedUser = await redisClient.incr(token);
        
        if (numberOfRequestByAuthorizedUser === 1) {
            await redisClient.expire(token, WINDOW_SIZE_IN_SECONDS);
            ttl = WINDOW_SIZE_IN_SECONDS;
        } else {
            ttl = await redisClient.ttl(token);
        }
        
        res.setHeader('X-RateLimit-TTL', ttl);
        if (numberOfRequestByAuthorizedUser >= MAX_REQ_ALLOWED_OF_AUTH_USER_PER_MINUTE) {
            return res.status(429).json({ message: 'Too Many Requests! Try again later!', ttl });
        } else {
            next();
        }

    } else {
        const clientIP = req.ip;

        const numberOfRequestByNotLoggedInUser = await redisClient.incr(clientIP);

        if (numberOfRequestByNotLoggedInUser === 1) {
            await redisClient.expire(clientIP, WINDOW_SIZE_IN_SECONDS);
            ttl = WINDOW_SIZE_IN_SECONDS;
        } else {
            ttl = await redisClient.ttl(clientIP);
        }

        res.setHeader('X-RateLimit-TTL', ttl);
        if (numberOfRequestByNotLoggedInUser >= MAX_REQ_ALLOWED_OF_NOT_SIGNEDIN_PER_MINUTE) {
            return res.status(429).json({ message: 'Too Many Requests! Try again later!', ttl });
        } else {
            next();
        }
    }

}

module.exports = rateLimiter;