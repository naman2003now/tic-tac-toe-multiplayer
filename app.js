const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 6969

io.on("connection", (socket) => {
    console.log("Connection Reached")
    socket.on('join', ({name, roomName}) => {
        socket.join(roomName)
        
    })
})

app.set('views', './public')
app.set('view engine', 'ejs')

app.use("/css", express.static(path.join(__dirname, "public/css")))
app.use("/js", express.static(path.join(__dirname, "public/js")))

app.get("/", (req, res) => {
    res.render("lobby")
})

app.get("/game", (req, res) => {
    res.render("game")
})

server.listen(port, () => {
    console.log("Listening to port : " + port)
})