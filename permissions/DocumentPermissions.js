const ROLE = require('../models/Roles');

function getUserRole(document, user) {

    if (user.isAdmin) return ROLE.ADMIN;
    if (document.user.toString() === user._id.toString()) return ROLE.AUTHOR;

    if (document.sharedWith.length === 0) return null;

    const indexOfSharedUser = document.sharedWith.findIndex(sharedUser => sharedUser.user.toString() === user._id.toString());
    
    if (indexOfSharedUser === -1) return null;

    return document.sharedWith[indexOfSharedUser].role;
}


async function canViewDocument(user, document) {
    const userRole = getUserRole(document, user);

    return (
        user.isAdmin ||
        userRole === ROLE.SUPERADMIN ||
        userRole === ROLE.ADMIN ||
        userRole === ROLE.VIEWER ||
        userRole === ROLE.AUTHOR ||
        userRole === ROLE.COLLABORATOR
    )
}

async function canDeleteDocument(user, document) {
    const userRole = getUserRole(document, user);

    return (
        user.isAdmin ||
        userRole === ROLE.SUPERADMIN ||
        userRole === ROLE.ADMIN ||
        userRole === ROLE.AUTHOR
    )
}

async function canEditDocument(user, document) {
    const userRole = getUserRole(document, user);

    return (
        user.isAdmin ||
        userRole === ROLE.SUPERADMIN ||
        userRole === ROLE.ADMIN ||
        userRole === ROLE.COLLABORATOR ||
        userRole === ROLE.AUTHOR
    )
}

async function canShareDocument(user, document) {
   
    const userRole = getUserRole(document, user);

    return (
        userRole === ROLE.SUPERADMIN,
        userRole === ROLE.ADMIN,
        userRole === ROLE.AUTHOR
    )
}

module.exports = {
    canViewDocument,
    canDeleteDocument,
    canEditDocument,
    canShareDocument
}