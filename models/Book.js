const mongoose = require('mongoose');

const demoSchema = mongoose.Schema({
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
        required:true
    }
},{
    timestamps:true
})

const Demo = mongoose.model('Demo',demoSchema)
module.exports = Demo