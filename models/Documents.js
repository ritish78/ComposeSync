const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user'
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
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Document = mongoose.model('documents', DocumentSchema);