const express = require('express')
const http = require('http')
const path = require('path')
const { debugPort } = require('process')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 6969

var db = []

io.on("connection", (socket) => {
    console.log("Connection Reached")
    socket.on('join', ({name, roomName}) => {
        players_in_room = db.filter((user) => user.roomName == roomName)
        if(players_in_room.length > 1){
            socket.emit('full')
        }
        else{
            if(players_in_room.length == 1){
                if(players_in_room[0].name == name){
                    socket.emit('name')
                    socket.to(roomName).emit('name')
                    db = db.filter((player) => player.roomName != roomName)
                }else
                {
                    socket.join(roomName)
                    socket.emit('connected', {player1: name, player2: players_in_room[0].name, playas:"X"})
                    socket.to(roomName).emit('connected', {player1: players_in_room[0].name, player2: name, playas:"O"})
                    db.push({id: socket.id, name, roomName, score: 0})
                }
            }
            else{
                socket.join(roomName)
                db.push({id: socket.id, name, roomName, score: 0})
            }
        }
    })

    socket.on('play', (position) => {
        socket.to(db.filter((user) => user.id == socket.id)[0].roomName).emit('update', position)
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