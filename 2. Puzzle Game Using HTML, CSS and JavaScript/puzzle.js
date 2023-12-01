let rows = 3;
let columns = 3;

let currentTile;
let otherTile; // blank Tile

let turns = 0;

// let imgOrder = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let imgOrder = ['4', '2', '8', '5', '1', '6', '7', '9', '3']

window.onload = function() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            // <img id = "0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + '-' + c.toString();
            tile.src = imgOrder.shift() + '.jpg';
            
            

            // Drag Functionality

            tile.addEventListener("dragstart", dragStart) //click img to drag
            tile.addEventListener("dragover", dragOver) //moving img while click
            tile.addEventListener("dragenter", dragEnter) //dragging img onto another one
            tile.addEventListener("dragleave", dragLeave) //dragged img leaved over another img
            tile.addEventListener("drop", dragDrop) // chnaged img over each img, drop
            tile.addEventListener("dragend", dragEnd) //after drag drop, Swap imges
            document.getElementById("board").append(tile);
        }
        
    }

}

function dragStart() {
    currentTile = this; // this refers to img tile being dragged
}
function dragOver(e) {
    e.preventDefault();
    
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {
  
}
function dragDrop() {
    otherTile = this; // this refers to tile being dropped on
}
function dragEnd() {
    if (!otherTile.src.includes("9.jpg")) {
        return;  // this is used so that we can only swipe with swipe tile 
        
    }

    let currentCordinates = currentTile.id.split('-') // exg "0-0" => ["0", "0"]
    let r = parseInt(currentCordinates[0]);
    let c = parseInt(currentCordinates[1]);

    let otherCordinates = otherTile.id.split('-');
    let r2 = parseInt(otherCordinates[0]);
    let c2 = parseInt(otherCordinates[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        
        let currentImg = currentTile.src;
        let otherImg = otherTile.src;

        currentTile.src = otherImg;
        otherTile.src = currentImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
    
}