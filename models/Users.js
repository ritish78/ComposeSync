const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    documents: [
        {
            document: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'documents'
            }
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema);