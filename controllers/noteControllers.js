const Note = require("../models/Note")

exports.createNote=async(req,res,next) =>{
    try {
        const newDocument = new Note({
            user : req.user
        })
        const document = await newDocument.save()
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
    const note = await Note.findById(req.params.id)
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
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.updateNoteDescription=async(req,res,next) =>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.updateNoteIcon=async(req,res,next) =>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}