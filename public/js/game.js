let socket = io()

// I feel foolish doing this 🤣😅 
possibleVictory = [
    ['TL', 'TM', 'TR'],
    ['L', 'M', 'R'],
    ['BL', 'BM', 'BR'],
    ['TL', 'L', 'BL'],
    ['TM', 'M', 'BM'],
    ['TR', 'R', 'BR'],
    ['TL', 'M', 'BR'],
    ['BL', 'M', 'TR']
]

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
    location.replace("/")
    alert("The room is full")
})
socket.on('dc', () => {
    location.replace("/")
    alert("Your opponent left")
})
socket.on('name', () => {
    location.replace("/")
    alert("An error occured caused the game to crash \n(Might be an identity theft, or you refreshed the page)")
})

socket.on('connected', ({player1, player2, playas}) => {
    var myScore = 0
    var opponentScore = 0
    var playingas = playas
    var turn = playas == "X"
    function play(position, mark){
        if(turn){
            turnDisplay = document.getElementsByClassName("yourturn")[0]      
            if(turnDisplay){ 
                turnDisplay.className = "oppturn"
                turnDisplay.innerHTML = "Opponenet's turn"
            }
        }else{
            turnDisplay = document.getElementsByClassName("oppturn")[0]
            if(turnDisplay){        
                turnDisplay.className = "yourturn"
                turnDisplay.innerHTML = "Your turn"
            }
        }
        turn = !turn
        document.getElementById(position).innerHTML = mark
        winingArray = possibleVictory.filter((element) => (
                document.getElementById(element[0]).innerHTML == document.getElementById(element[1]).innerHTML 
                && document.getElementById(element[1]).innerHTML == document.getElementById(element[2]).innerHTML 
                && document.getElementById(element[2]).innerHTML == playingas
                ))
        if(winingArray.length > 0){
            win(winingArray[0])
        }

        emtpyBoxes = possibleVictory.filter((element) => (
            document.getElementById(element[0]).innerHTML == " "
            || document.getElementById(element[1]).innerHTML == " "
            || document.getElementById(element[2]).innerHTML == " " 
            ))
        if(emtpyBoxes.length == 0){
            ['TL', 'TM', 'TR', 'L', 'M', 'R', 'BL', 'BM', 'BR'].forEach((pos) => {
                document.getElementById(pos).style.animation = "draw 0.5s 2 alternate ease-in-out"
            })
            refresh(['TL', 'TM', 'TR', 'L', 'M', 'R', 'BL', 'BM', 'BR'])
        }
    }

    function win(positions){
        myScore++
        document.getElementsByClassName("you")[0].innerHTML = "You: " + myScore
        socket.emit('win', positions)
        positions.forEach((pos) => {
            document.getElementById(pos).style.animation = "win 0.5s 2 alternate ease-in-out"
        })
        refresh(positions)

    }

    socket.on('lose', (positions) => {
        opponentScore++
        document.getElementsByClassName("opponent")[0].innerHTML = player2 + ": " + opponentScore
        positions.forEach((pos) => {
            document.getElementById(pos).style.animation = "lose 0.5s 2 alternate ease-in-out"
        })
        refresh(positions)
    })

    function refresh(positions){
        setTimeout(() => { 
            cells.topLeft.innerHTML = " "
            cells.topMiddle.innerHTML = " "
            cells.topRight.innerHTML = " "
            cells.Left.innerHTML = " "
            cells.Middle.innerHTML = " "
            cells.Right.innerHTML = " "
            cells.bottomLeft.innerHTML = " "
            cells.bottomMiddle.innerHTML = " "
            cells.bottomRight.innerHTML = " "
            if(playingas == "X"){
                playingas = "O"
            }
            else{
                playingas = "X"
            }
            turn = playingas == "X"
            if(!turn){
                turnDisplay = document.getElementsByClassName("yourturn")[0]      
                if(turnDisplay){ 
                    turnDisplay.className = "oppturn"
                    turnDisplay.innerHTML = "Opponenet's turn"
                }
            }else{
                turnDisplay = document.getElementsByClassName("oppturn")[0]
                if(turnDisplay){        
                    turnDisplay.className = "yourturn"
                    turnDisplay.innerHTML = "Your turn"
                }
            }
            positions.forEach((pos) => {
                document.getElementById(pos).style.animation = ""
            })
        }, 1000)

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

    if(!turn){
        turnDisplay = document.getElementsByClassName("yourturn")[0]
        if(turnDisplay){        
            turnDisplay.className = "oppturn"
            turnDisplay.innerHTML = "Opponenet's turn"
        }
    }

})




