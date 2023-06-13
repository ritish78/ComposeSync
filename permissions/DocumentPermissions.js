const ROLE = require('../models/Roles');
const User = require('../models/Users');

async function canViewDocument(currentUserId, documentUserId) {
    try {
        const user = await User.findById(currentUserId);
        return (
            user.isAdmin ||
            user.role === ROLE.SUPERADMIN ||
            user.role === ROLE.ADMIN ||
            user.role === ROLE.VIEWER ||
            user.role === ROLE.AUTHOR ||
            user.role === ROLE.COLLABORATOR ||
            currentUserId === documentUserId 
        )
    } catch (error) {
        res.status(403).json({ message: 'User is not authorized!' });
    }
}

async function canDeleteDocument(currentUserId, documentUserId) {
    try {
        const user = await User.findById(currentUserId);
        return (
            user.isAdmin ||
            user.role === ROLE.SUPERADMIN ||
            user.role === ROLE.ADMIN ||
            user.role === ROLE.AUTHOR ||
            currentUserId === documentUserId
        )
    } catch (error) {
        res.status(403).json({ message: 'User is not authorized!' });
    }
}

async function canEditDocument(currentUserId, documentUserId) {
    try {
        const user = await User.findById(currentUserId);
        return (
            user.isAdmin ||
            user.role === ROLE.SUPERADMIN ||
            user.role === ROLE.ADMIN ||
            user.role === ROLE.COLLABORATOR ||
            user.role === ROLE.AUTHOR ||
            currentUserId === documentUserId
        )
    } catch (error) {
        res.status(403).json({ message: 'User is not authorized!' });
    }
}

module.exports = {
    canViewDocument,
    canDeleteDocument,
    canEditDocument
}