const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Note = require("../models/Note")
const Book = require("../models/Book")

exports.signup=async(req,res,next) =>{
    try {
        const { email, password } = req.body

        //find exists userEmail
        const findUser = await User.findOne({ email: email })

        if (findUser) return res.status(405).json({
            success: "failed",
            status: 405,
            message: "User already exists"
        })

        // //generate hash password
        const hashed = await bcrypt.hash(password, 10)

        // //create user
        const newUser = new User({
            ...req.body,
            password: hashed,
        })

        const user = await newUser.save()

        await new Book({
            user: user._id,
            name: user._id,
        }).save()

        res.status(200).json({
            success: "success",
            status: 200,
            message: "Successfully signup",
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.signin=async(req,res,next) =>{
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(405).json({
                success: false,
                status: 405,
                message: 'Not Found any account.'
            })
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        const isVerified = await bcrypt.compare(password, user.password)

        if (!isVerified) {
            return res.status(405).json({
                success: false,
                status: 405,
                message: 'Credentials wrong.'
            })
        }

        res.status(200).json({
            success: true,
            status: 200,
            message: 'Successfully signin.',
            token: token,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.getDocCollection=async(req,res,next) =>{
    try {
    const books = await Book.find({
        user : req.user,
        name : {$ne : req.user}
    })
    const book = await Book.findOne({name : req.user}).populate('notes')
    return res.status(200).json({
        success : true,
        status : 200,
        message : 'Document found',
        data : {
            books,
            notes : book.notes
        }
    })
    } catch (error) {
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}

exports.getIndexData=async(req,res,next) =>{
    try {
    const notes = await Note.find({isPublish : true}).populate('user','-_id name')

    const allKeywords = notes.flatMap(note => note.keywords)
    const keywords = [...new Set(allKeywords)]

    return res.status(200).json({
        success : true,
        status : 200,
        message : 'Document found',
        data : {
            notes,
            keywords
        }
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            status : 500,
            message : error.message
        })
    }
}