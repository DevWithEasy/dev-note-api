require("dotenv").config()
const path = require("path")
const express = require('express');
const errorHandler = require("./middleware/errorHandler");
const applyMidleware = require("./middleware/middlewares");
const applyRouter = require("./routers/routers");
const dbConnection = require("./config/dbConnection");
const app = express();
const http = require('http')
const  { Server } = require("socket.io")

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
    socket.on('edit_note',(data)=>{
        console.log(data)
        socket.to(data.id).emit('edit_note_client', {description : data.description})
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