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

const io = new Server(server)

io.on("connection",(socket)=>{
    console.log('a user connected\n'+socket.id)
})

errorHandler(app)


server.listen(process.env.PORT || 8080,()=>{
    console.log('Express server listening on port 8080')
    dbConnection()
})