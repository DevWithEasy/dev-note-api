const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        default : 'Untitled Document'
    },
    description: {
        type: String,
        default : ''
    },
    keywords: {
        type: [
            {
                type: String
            }
        ],
        default: []
    },
    icon: {
        type: String,
        default: 'doc'
    },
}, {
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note