const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    favourite:{
        type: [{type : mongoose.Types.ObjectId,ref : 'Note'}],
        default: []
    },
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema)
module.exports = User