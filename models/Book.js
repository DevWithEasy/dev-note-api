const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name:{
        type: String,
        required:true
    },
    notes : {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Note'
            }
        ]
    },
    icon:{
        type: String,
        default : 'book'
    }
},{
    timestamps:true
})

const Book = mongoose.model('Book',bookSchema)
module.exports = Book