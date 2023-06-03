const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

dotenv.config();

module.exports = function (req, res, next) {
    //First, we get the token from header
    let token = req.header('authorization');
    console.log({ token });
    // token = token.replace(/^Bearer\s+/, "");

    //Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, user is not authorized' });
    }

    //Verify token
    try {
        jwt.verify(
                    token, 
                    process.env.JWT_SECRET,
                    (error, decoded) => {
                        if (error) console.log('Incorrect token!');
                        req.user = decoded.user; 
                        console.log('Decoded user:', decoded);
                        console.log('Decoded user id:', decoded.user);
                        next();
                    }
        );

    } catch (error) {
        res.status(401).json({ message: 'Could not authorize user!' });
    }
}
