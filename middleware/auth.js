const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

dotenv.config();

module.exports = function (req, res, next) {
    //First, we get the token from header
    const token = req.header('Authorization');

    //Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, user is not authorized' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Could not authoize user!' });
    }
}
