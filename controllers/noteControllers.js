const Note = require("../models/Note")
const Book = require("../models/Book")

exports.createNote=async(req,res,next) =>{
    try {

        const findBook = await Book.findOne({name : req.user})

        const newDocument = new Note({
            user : req.user
        })
        const document = await newDocument.save()

        const bookid = req.query.is_book === 'yes' && req.query.book ? req.query.book : findBook._id
        
        await Book.findByIdAndUpdate(bookid, { $push: { notes: document._id } }, { new: true })
        
        return res.status(200).json({
            success : true,
            status : 200,
            message : 'Document created successfully',
            data : document
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.deleteNote=async(req,res,next) =>{
    try {
        await Note.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success : true,
            status : 200,
            message : 'Document updated successfully',
            data : {}
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.getNote=async(req,res,next) =>{
    try {
    const note = await Note.findById(req.params.id).populate('user')
    if(!note){
        return res.status(404).json({
            success : false,
            status : 404,
            message : 'Document not found'
        })
    }else{
        return res.status(200).json({
            success : true,
            status : 200,
            message : 'Document found',
            data : note
        })
    }

    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.updateNoteTitle=async(req,res,next) =>{
    try {
        const note = await Note.findByIdAndUpdate(req.params.id,{title : req.body.title},{new: true})
        return res.status(200).json({
            success : true,
            status : 200,
            message : 'Document updated successfully',
            data : note
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}