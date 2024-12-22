require("dotenv").config()
const path = require("path")
const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const applyMidleware = require("./middleware/middlewares");
const applyRouter = require("./routers/routers");
const dbConnection = require("./config/dbConnection");
const app = express();
const http = require('http')
const  { Server } = require("socket.io");
const Note = require("./models/Note");

app.use(express.static(path.join(__dirname,'public')))

const server = http.createServer(app)

applyMidleware(app)

applyRouter(app)

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
})

io.on("connection",(socket)=>{
    console.log('a user connected\n'+socket.id)
    socket.on('join_edit',(data)=>{
        socket.join(data.id)
        console.log('Join ' + data.id)
    })

    //title
    socket.on('edit_title_api',async(data)=>{
        console.log(data)
        socket.to(data.id).emit('edit_title_client', data)
        await Note.findByIdAndUpdate(data.id, {title : data.title})
    })

    //title
    socket.on('edit_icon_api',async(data)=>{
        socket.to(data.id).emit('edit_icon_client', data)
        await Note.findByIdAndUpdate(data.id, {icon : data.icon})
    })

    //description
    socket.on('edit_note',async(data)=>{
        socket.to(data.id).emit('edit_note_client', {description : data.description})
        await Note.findByIdAndUpdate(data.id, {description : data.description})
    })
    
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })
})

errorHandler(app)

server.listen(process.env.PORT || 8080,()=>{
    console.log('Express server listening on port 8080')
    dbConnection()
})