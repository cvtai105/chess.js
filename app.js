createDOMElements();

startNewGame();

function startNewGame() {
    clearBoard();
    setupBoard();
    whiteTurn = false;
    switchTurn();
}

function clearBoard(){
    [...squares].forEach(element => {
        element.querySelector('img')?.remove();
    })
}

function setupBoard() {
    chessInfo = JSON.parse(JSON.stringify(initialChessInfo)); //shallow copy
    for(let square of squares){
        if(startBoardMap[square.id] === undefined){
            square.setAttribute("state", "");
            continue;
        }

        const chessElem = createChessElement(startBoardMap[square.id]);
        square.appendChild(chessElem);
        square.setAttribute("state", chessElem.getAttribute("name"));
    }
}

function createDOMElements() {
    //create blurcirle on all square
    for(sqr of squares){
        const cir = document.createElement("div");
        cir.setAttribute("class", "blur-circle");
        sqr.appendChild(cir);
    }

}

document.getElementById("restartBtn").onclick = startNewGame;
