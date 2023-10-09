//option1: create custom attribute on DOM to store data
//option2: reference from DOM to object use map[chessid] = object 
//test option1 on Pawn
//test option2 on others

//k: king, q: queen, n: knight, p: pawn, b: bishop, r: rook

"use strict";


var whiteTurn = true;
const CHESS_WIDTH = "80px";

const squares = document.getElementsByClassName("square");
const NewGameBtn = document.getElementById("restartBtn");
const WTDisplayElem = document.getElementById("white-turn-display");
const BTDisplayElem = document.getElementById("black-turn-display");
const AllBlackChessElem = document.getElementsByName("black-chess");
const AllWhiteChessElem = document.getElementsByName("white-chess");


//chess.id mapto inform
const initialChessInfo = {
    "bR1":{id: "bR1", srcValue: "./images/bR.png", roll: "r", nameValue: "black-chess"},
    "bN2":{id: "bN2", srcValue: "./images/bN.png", roll: "n", nameValue: "black-chess"},
    "bB3":{id: "bB3", srcValue: "./images/bB.png", roll: "b", nameValue: "black-chess"},
    "bQ4":{id: "bQ4", srcValue: "./images/bQ.png", roll: "q", nameValue: "black-chess"},
    "bK5":{id: "bK5", srcValue: "./images/bK.png", roll: "k", nameValue: "black-chess"}, 
    "bB6":{id: "bB6", srcValue: "./images/bB.png", roll: "b", nameValue: "black-chess"},
    "bN7":{id: "bN7", srcValue: "./images/bN.png", roll: "n", nameValue: "black-chess"},
    "bR8":{id: "bR8", srcValue: "./images/bR.png", roll: "r", nameValue: "black-chess"},

    "bP1":{id: "bP1", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true},
    "bP2":{id: "bP2", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true},
    "bP3":{id: "bP3", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true},
    "bP4":{id: "bP4", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true},
    "bP5":{id: "bP5", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true},
    "bP6":{id: "bP6", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true},
    "bP7":{id: "bP7", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true},
    "bP8":{id: "bP8", srcValue: "./images/bP.png", roll: 'bp',nameValue: "black-chess", firstMove: true}, 

    "wR1":{id: "wR1", srcValue: "./images/wR.png", roll: 'r', nameValue: "white-chess"},
    "wN2":{id: "wN2", srcValue: "./images/wN.png", roll: 'n', nameValue: "white-chess"},
    "wB3":{id: "wB3", srcValue: "./images/wB.png", roll: 'b', nameValue: "white-chess"},
    "wQ4":{id: "wQ4", srcValue: "./images/wQ.png", roll: 'q', nameValue: "white-chess"},
    "wK5":{id: "wK5", srcValue: "./images/wK.png", roll: 'k', nameValue: "white-chess"},
    "wB6":{id: "wB6", srcValue: "./images/wB.png", roll: 'b', nameValue: "white-chess"},
    "wN7":{id: "wN7", srcValue: "./images/wN.png", roll: 'n', nameValue: "white-chess"},
    "wR8":{id: "wR8", srcValue: "./images/wR.png", roll: 'r', nameValue: "white-chess"},

    "wP1":{id: "wP1", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
    "wP2":{id: "wP2", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
    "wP3":{id: "wP3", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
    "wP4":{id: "wP4", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
    "wP5":{id: "wP5", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
    "wP6":{id: "wP6", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
    "wP7":{id: "wP7", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
    "wP8":{id: "wP8", srcValue: "./images/wP.png", roll: 'wp', nameValue: "white-chess", firstMove: true},
}

var chessInfo = JSON.parse(JSON.stringify(initialChessInfo));





// roll attribute map to get dropable sqrs 
const getDropables = {
    "bp": (chessElem) => {
        const result = new Set();
        let startSqr = getRowCol(chessElem.parentNode);
        let sqr = getSquareElement(startSqr.row - 1, startSqr.col);
        if(sqr.getAttribute("state") == ""){
            result.add(sqr);
            if(chessInfo[chessElem.id].firstMove == true){
                sqr = getSquareElement(startSqr.row - 2, startSqr.col);
                if(sqr.getAttribute("state") == ""){
                    result.add(sqr);
                }
            }  
        }

        sqr = getSquareElement(startSqr.row - 1, startSqr.col-1);
        if(sqr !== null){
            if(sqr.getAttribute("state") == "white-chess"){
                result.add(sqr);
            }
        }

        sqr = getSquareElement(startSqr.row - 1, startSqr.col + 1);
        if(sqr !== null){
            if(sqr.getAttribute("state") == "white-chess"){
                result.add(sqr);
            }
        }

        return result;

    },
    "wp": (chessElem) => {
        const result = new Set();
        let startSqr = getRowCol(chessElem.parentNode);
        let sqr = getSquareElement(startSqr.row + 1, startSqr.col);
        if(sqr.getAttribute("state") == ""){
            result.add(sqr);
            if(chessInfo[chessElem.id].firstMove == true){    
                sqr = getSquareElement(startSqr.row + 2, startSqr.col);
                if(sqr.getAttribute("state") == ""){
                    result.add(sqr);
                }
            } 
        }

          

        sqr = getSquareElement(startSqr.row + 1, startSqr.col+1);
        if(sqr !== null){
            if(sqr.getAttribute("state") == "black-chess"){
                result.add(sqr);
            }
        }

        sqr = getSquareElement(startSqr.row + 1, startSqr.col - 1);
        if(sqr !== null){
            if(sqr.getAttribute("state") == "black-chess"){
                result.add(sqr);
            }
        }

        return result;
    },

    "q": (chessElem) => {
        const result = new Set();
        const {row, col} = getRowCol(chessElem.parentNode);
        let sqr;
        
        const moves = [
            [ 1, -1], [ 1, 0], [ 1, 1],
            [ 0, -1],          [ 0, 1],
            [-1, -1], [-1, 0], [-1, 1]
        ];

        for (const [rowOffset, colOffset] of moves) {
            let newRow = row;
            let newCol = col;

            while (1) {
                newRow += rowOffset;
                newCol += colOffset;
                sqr = getSquareElement(newRow, newCol);
                if(!sqr){
                    break;
                }
                if(sqr.getAttribute("state") != ""){
                    if(sqr.getAttribute("state") != chessElem.getAttribute("name")){
                        result.add(sqr);
                    }
                    break;
                }
                else {
                    result.add(sqr);
                }
            }
        }

        return result;
    },
    "k": (chessElem) => {
        const result = new Set();
        let startSqr = getRowCol(chessElem.parentNode);
        let sqr;

        const moves = [
            [ 1, -1], [ 1, 0], [ 1, 1],
            [ 0, -1],          [ 0, 1],
            [-1, -1], [-1, 0], [-1, 1]
        ];
        
        for (const [rowOffset, colOffset] of moves) {
            const newRow = startSqr.row + rowOffset;
            const newCol = startSqr.col + colOffset;
            
            sqr = getSquareElement(newRow, newCol);
            if(!sqr){
                continue;
            }
            if(sqr.getAttribute("state") != chessElem.getAttribute("name")){   
                result.add(sqr);
            }
        }
        return result;
    },
    "b": (chessElem) => {
        const result = new Set();
        const {row, col} = getRowCol(chessElem.parentNode);
        let sqr;
        
        const moves = [
            [1, -1], [1, 1],
            [-1, -1], [-1, 1]
        ];

        for (const [rowOffset, colOffset] of moves) {
            let newRow = row;
            let newCol = col;

            while (1) {
                newRow += rowOffset;
                newCol += colOffset;
                sqr = getSquareElement(newRow, newCol);
                if(!sqr){
                    break;
                }
                if(sqr.getAttribute("state") != ""){
                    if(sqr.getAttribute("state") != chessElem.getAttribute("name")){
                        result.add(sqr);
                    }
                    break;
                }
                else {
                    result.add(sqr);
                }
            }
        }

        return result;
    },
    "n": (chessElem) => {
        const result = new Set();
        let startSqr = getRowCol(chessElem.parentNode);
        let sqr;

        const moves = [
            [2, -1], [2, 1],
            [1, -2], [1, 2],
            [-1, -2], [-1, 2],
            [-2, -1], [-2, 1]
        ];
        
        for (const [rowOffset, colOffset] of moves) {
            const newRow = startSqr.row + rowOffset;
            const newCol = startSqr.col + colOffset;
            
            sqr = getSquareElement(newRow, newCol);
            if(!sqr){
                continue;
            }
            if(sqr.getAttribute("state") != chessElem.getAttribute("name")){   
                result.add(sqr);
            }
        }
        return result;
    },
    "r": (chessElem) => {
        const result = new Set();
        const {row, col} = getRowCol(chessElem.parentNode);
        let sqr;
        
        const moves = [
                    [ 1, 0], 
            [0, -1],        [0, 1],   
                    [-1, 0]
        ];

        for (const [rowOffset, colOffset] of moves) {
            let newRow = row;
            let newCol = col;

            while (1) {
                newRow += rowOffset;
                newCol += colOffset;
                sqr = getSquareElement(newRow, newCol);
                if(!sqr){
                    break;
                }
                if(sqr.getAttribute("state") != ""){
                    if(sqr.getAttribute("state") != chessElem.getAttribute("name")){
                        result.add(sqr);
                    }
                    break;
                }
                else {
                    result.add(sqr);
                }
            }
        }

        return result;
    }

}


//square id map to chess element
const startBoardMap = {
    'a8': chessInfo["bR1"],
    'b8': chessInfo["bN2"],
    'c8': chessInfo["bB3"],
    'd8': chessInfo["bQ4"],
    'e8': chessInfo["bK5"],
    'f8': chessInfo["bB6"],
    'g8': chessInfo["bN7"],
    'h8': chessInfo["bR8"],

    'a7': chessInfo["bP1"],
    'b7': chessInfo["bP2"],
    'c7': chessInfo["bP3"],
    'd7': chessInfo["bP4"],
    'e7': chessInfo["bP5"],
    'f7': chessInfo["bP6"],
    'g7': chessInfo["bP7"],
    'h7': chessInfo["bP8"],

    'a1': chessInfo["wR1"],
    'b1': chessInfo["wN2"],
    'c1': chessInfo["wB3"],
    'd1': chessInfo["wQ4"],
    'e1': chessInfo["wK5"],
    'f1': chessInfo["wB6"],
    'g1': chessInfo["wN7"],
    'h1': chessInfo["wR8"],

    'a2': chessInfo["wP1"],
    'b2': chessInfo["wP2"],
    'c2': chessInfo["wP3"],
    'd2': chessInfo["wP4"],
    'e2': chessInfo["wP5"],
    'f2': chessInfo["wP6"],
    'g2': chessInfo["wP7"],
    'h2': chessInfo["wP8"]
}


const ondieHandler = {
    king: (e) => {
        e.target.remove();
        endGame(e.target.id.charAt(0));
    },  

    other: (e) => {
        console.log(e);
        e.target.remove();
    }
}

const onmovedHandler = (chessElem, departSqrElm, desSqrElem) => {
    
    switchTurn();
    desSqrElem.querySelector('img')?.dispatchEvent(dieEvt);

    if(chessInfo[chessElem.id].roll == 'wp' || chessInfo[chessElem.id].roll == 'bp'){
        chessInfo[chessElem.id].firstMove = false;
    
        if(getRowCol(desSqrElem).row == 8){
            chessInfo[chessElem.id].roll = "q";
        }
    }

    
    //update square state
    departSqrElm.setAttribute("state", "");
    desSqrElem.setAttribute("state", chessElem.getAttribute("name"));

    desSqrElem.appendChild(chessElem);
}


const dieEvt = new Event("die");

function createChessElement(obj){
    const result =  document.createElement("img");
    result.setAttribute("id", obj.id);
    result.setAttribute("src", obj.srcValue);
    result.setAttribute("name", obj.nameValue);
    result.setAttribute("class", "chess");
    result.setAttribute("width", CHESS_WIDTH);
    addMoveAbility(result);
    
    if(obj.id.charAt(1) == 'K') result.addEventListener("die", ondieHandler.king);
    else result.addEventListener("die", ondieHandler.other);
    return result;
}


// TODO: move handler to global scope
function addMoveAbility(element) {
//this function also add highlight-square ability



    let firstSqrElem, lastSqrElem, nextSqrElem, dropables;
    element.addEventListener("mousedown", (event) => {

        event.preventDefault();

        //pickup effect
        lastSqrElem = firstSqrElem = element.parentNode;
        firstSqrElem.classList.add("highlight");
        element.style.left = `${event.clientX - firstSqrElem.offsetLeft - 40}px`;
        element.style.top = `${event.clientY - firstSqrElem.offsetTop - 40}px`;

        dropables = getDropables[chessInfo[element.id].roll](element);
        displayBlurCicle(dropables);
        document.addEventListener("mousemove", moveAnimation);
        document.addEventListener("mouseup", dropChess)

    })

    const moveAnimation = e => {
       
        e.preventDefault();

        element.style.left = `${e.clientX - firstSqrElem.offsetLeft - 40}px`;
        element.style.top = `${e.clientY - firstSqrElem.offsetTop - 40}px`;
        
        nextSqrElem = getSquareByAxis(e.clientX, e.clientY); //can be null if out of board

        if(nextSqrElem == null){
            lastSqrElem.classList.remove("highlight");
            lastSqrElem = firstSqrElem;
        }
        else if(nextSqrElem.id != lastSqrElem.id){
            lastSqrElem.classList.remove("highlight");
            lastSqrElem = nextSqrElem;
            lastSqrElem.classList.add("highlight");
        } 
        
        firstSqrElem.classList.add("highlight");
    }

    const dropChess = (e) => {
        if(lastSqrElem != null){
            if(dropables.has(lastSqrElem)){
                onmovedHandler(element, firstSqrElem, lastSqrElem);
            }
            lastSqrElem.classList.remove("highlight");
        }

        firstSqrElem.classList.remove("highlight");
        element.style.left = "0";
        element.style.top = "0";

        hiddenBlurCicle(dropables);

        document.removeEventListener("mousemove", moveAnimation);
        document.removeEventListener("mouseup", dropChess);
    }

    function getSquareByAxis(x,y) {
        const topLeftSquare = document.getElementById("a8");
        const rootBoardX = topLeftSquare.offsetLeft;
        const rootBoardY = topLeftSquare.offsetTop; 
        let col = Math.ceil((x-rootBoardX) / 80);
        let row = 8 - Math.floor((y - rootBoardY) / 80);
        return getSquareElement(row, col);
    }
    
}

function getSquareElement(row, col) {
    if(row < 1 || row > 8) return null;
    if(col < 1 || col > 8) return null;
    let x = 8 - row;
    let y = col -1;
    return squares[x*8 + y];
}

function clearBoard(){
    [...squares].forEach(element => {
        element.querySelector('img')?.remove();
    })
}


// function isSquareOccupied(sqr) {
//     let e = sqr.querySelector('img');
//     if (e == null) return 0;
//     if (e.party == "black") return 2;
//     else return 1;
// }


function getRowCol(sqrElem) {
    let row = sqrElem.id.charCodeAt(1) - 48;
    let col = sqrElem.id.charCodeAt(0) - 96;
    return {row, col};
}

function switchTurn() {
    whiteTurn = !whiteTurn;
    if(!whiteTurn){
        BTDisplayElem.style.visibility = "visible";
        WTDisplayElem.style.visibility = "hidden";
        for(const elem of AllBlackChessElem){
            elem.style.pointerEvents = "all";
        }
        for(const elem of AllWhiteChessElem){
            elem.style.pointerEvents = "none";
        }
    }
    else{
        BTDisplayElem.style.visibility = "hidden";
        WTDisplayElem.style.visibility = "visible";
        for(const elem of AllBlackChessElem){
            elem.style.pointerEvents = "none";
        }
        for(const elem of AllWhiteChessElem){
            elem.style.pointerEvents = "all";
        }
    }
}

function endGame(lose) {
    
    for(const elem of AllBlackChessElem){
        elem.style.pointerEvents = "none";
    }
    for(const elem of AllWhiteChessElem){
        elem.style.pointerEvents = "none";
    }
    
    let message = "Black win";
    if(lose == 'b'){
        message = "White win";
    }
    setTimeout(() => {  //wait for render board
        alert(message)
    }, 0);
    
}

function displayBlurCicle(sqrs) {
    sqrs.forEach(s => {
        s.querySelector('.blur-circle').style.display = "block";
    })
}

function hiddenBlurCicle(sqrs) {
    sqrs.forEach(s => {
        s.querySelector('.blur-circle').style.display = "none";
    })
}

//king move to check square is not need in this excercise