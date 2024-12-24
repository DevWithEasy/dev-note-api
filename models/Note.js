const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
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
    isPublish: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note