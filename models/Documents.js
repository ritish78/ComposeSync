const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user'
    },
    author: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    data: {
        type: Object
    },
    edited: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            name: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    sharedWith: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            role: {
                type: String,
                default: 'collaborator'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    expiresAt: {
        type: Date,
        expires: 0,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = Document = mongoose.model('documents', DocumentSchema);