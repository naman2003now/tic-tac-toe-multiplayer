let socket = io()

function roomInfo(){
    rawData = location.search
    return {
        name: rawData.substring(10, rawData.search("&")).replace("+", " "),
        roomName: rawData.substring(rawData.search("&")+10, rawData.length)
    }
}

//Connecting to the room
socket.emit('join', roomInfo())
socket.on('full', () => {
    alert("The room is full")
    location.replace("/")
})
socket.on('name', () => {
    location.replace("/")
    alert("An error occured caused the game to crash \n(Might be an identity theft, or you refreshed the page)")
})

socket.on('connected', ({player1, player2, playas}) => {
    const playingas = playas
    var turn = playas == "X"
    function play(position, mark){
        turn = !turn
        document.getElementById(position).innerHTML = mark
    }

    function mark(position){
        if(turn === true){
            if(document.getElementById(position).innerHTML == " "){
                socket.emit('play', position)
                play(position, playingas)
            }
        }
    }

    socket.on('update', (position) => {
        if(playingas == "X"){
            play(position, "O") 
        }
        else{
            play(position, "X")
        }
    })

    document.getElementById("Title").innerHTML = player1 + " VS " + player2
    document.getElementsByClassName("opponent")[0].innerHTML = player2 + ": 0"

    cells = {
        topLeft: document.getElementById("TL"),
        topMiddle: document.getElementById("TM"),
        topRight: document.getElementById("TR"),
    
        Left: document.getElementById("L"),
        Middle: document.getElementById("M"),
        Right: document.getElementById("R"),
    
        bottomLeft: document.getElementById("BL"),
        bottomMiddle: document.getElementById("BM"),
        bottomRight: document.getElementById("BR")
    }
    
    cells.topLeft.onclick = () => {mark(cells.topLeft.id)}
    cells.topMiddle.onclick = () => {mark(cells.topMiddle.id)}
    cells.topRight.onclick = () => {mark(cells.topRight.id)}
    cells.Left.onclick = () => {mark(cells.Left.id)}
    cells.Middle.onclick = () => {mark(cells.Middle.id)}
    cells.Right.onclick = () => {mark(cells.Right.id)}
    cells.bottomLeft.onclick = () => {mark(cells.bottomLeft.id)}
    cells.bottomMiddle.onclick = () => {mark(cells.bottomMiddle.id)}
    cells.bottomRight.onclick = () => {mark(cells.bottomRight.id)}

    cells.topLeft.innerHTML = " "
    cells.topMiddle.innerHTML = " "
    cells.topRight.innerHTML = " "
    cells.Left.innerHTML = " "
    cells.Middle.innerHTML = " "
    cells.Right.innerHTML = " "
    cells.bottomLeft.innerHTML = " "
    cells.bottomMiddle.innerHTML = " "
    cells.bottomRight.innerHTML = " "

})




