const User = require('./../models/Users');

function authRole(role) {
    return async (req, res, next) => {
        const user = await User.findById(req.user.id);

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'User is not authorized!' })
        }

        next();
    }
}

module.exports = authRole;