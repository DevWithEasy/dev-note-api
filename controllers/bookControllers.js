const Book = require("../models/Book")

exports.createBook = async (req, res, next) => {
    try {
        const newBook = new Book({
            user: req.user,
            name: req.body.name
        })
        const book = await newBook.save()
        return res.status(200).json({
            success: true,
            status: 200,
            message: 'Document created successfully',
            data: book
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon
        }, { new: true })
        return res.status(200).json({
            success: true,
            status: 200,
            message: 'Document update successfully',
            data: book
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}

exports.deleteBook = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}

exports.getBook = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}

exports.getAllBook = async (req, res, next) => {
    try {

    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message
        })
    }
}

exports.getBookNotes=async(req,res,next) =>{
    try {
    const book = await Book.findById(req.params.id).populate('notes')
    if(!book){
        return res.status(404).json({
            success : false,
            status : 404,
            message : 'Book not found'
        })
    }else{
        return res.status(200).json({
            success : true,
            status : 200,
            message : 'Document found',
            data : book.notes
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