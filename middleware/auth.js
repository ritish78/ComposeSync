const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports = function (req, res, next) {
    //First, we get the token from header
    let token = req.header('jwt-token');
    console.log({ token });
    // token = token.replace(/^Bearer\s+/, "");

    //Check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, user is not authorized' });
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log({ decoded });

        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Could not authorize user!' });
    }
}
