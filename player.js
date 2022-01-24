const players = []

const addPlayer = (id, name, roomName) => {
    players_in_room = players.filter((user) => user.roomName == roomName)
    if(players_in_room.length > 1){
        return False
    }
    players.push({id, name, roomName})
    return True
}

module.exports = {addPlayer}