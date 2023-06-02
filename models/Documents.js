const mongoose = require('mongoose');

const DocumentSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'users'
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