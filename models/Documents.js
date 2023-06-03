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
    edited: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Document = mongoose.model('documents', DocumentSchema);