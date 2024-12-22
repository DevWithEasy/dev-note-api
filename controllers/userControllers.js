const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Note = require("../models/Note")
const Book = require("../models/Book")

exports.signup=async(req,res,next) =>{
    try {
        console.log(req.body)
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

        await newUser.save()

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
    const books = await Book.find({user : req.user})
    const notes = await Note.find({user : req.user}).select('title icon')
    return res.status(200).json({
        success : true,
        status : 200,
        message : 'Document found',
        data : {
            books,
            notes
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