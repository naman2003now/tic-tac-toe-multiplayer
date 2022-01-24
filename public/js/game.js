io()

function mark(currentMark){
    if (currentMark == "X"){
        return "O"
    }
    else{
        return "X"
    }
}

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

cells.topLeft.onclick = () => {cells.topLeft.innerHTML = mark(cells.topLeft.innerHTML)}
cells.topMiddle.onclick = () => {cells.topMiddle.innerHTML = mark(cells.topMiddle.innerHTML)}
cells.topRight.onclick = () => {cells.topRight.innerHTML = mark(cells.topRight.innerHTML)}
cells.Left.onclick = () => {cells.Left.innerHTML = mark(cells.Left.innerHTML)}
cells.Middle.onclick = () => {cells.Middle.innerHTML = mark(cells.Middle.innerHTML)}
cells.Right.onclick = () => {cells.Right.innerHTML = mark(cells.Right.innerHTML)}
cells.bottomLeft.onclick = () => {cells.bottomLeft.innerHTML = mark(cells.bottomLeft.innerHTML)}
cells.bottomMiddle.onclick = () => {cells.bottomMiddle.innerHTML = mark(cells.bottomMiddle.innerHTML)}
cells.bottomRight.onclick = () => {cells.bottomRight.innerHTML = mark(cells.bottomRight.innerHTML)}


