var numRows = 4
var numCols = 4
//change this to return the number of dots left insead of checkign
function goal(board) {
    for(var i = 0; i < numRows; i++){
        for(var j = 0; j < numCols; j++){
            if(board[i][j] == "dots.jpg")
                return false;
        }
    }
    return true;
}

function moveAllowed(currBoard,x,y){
    if(x <1 || y < 1 || x > 3 || y > 3)
        return false;
    if(currBoard[y][x] == "tile.png")
        return false;
    return true;
}

function getManhattanDist(oldx,oldy,newx,newy) {
    x = oldx - oldy;
    y = oldy - newy;
    return Math.sqrt(x*x + y*y);
}

function generateChilds(tree) {
    var currNode = tree.popMin();
    var currCost = currNode.gVal;
    var currBoard = currNode["gameState"];
    console.log(currBoard)
    var x = currNode["pacX"];
    var y = currNode["pacY"];
    if(moveAllowed(currBoard,x,y - 1) == true) {
        currBoard[y][x] = "blacktile.png";
        board[y - 1][x] = "pacman_open.png";
        b = currBoard;

        if(goal(b))
            return true;

        var newNode = { 
            gameState:b,
            pacX:x,
            pacY:y-1 ,
            gVal:currCost + 1,
            key:getManhattanDist(x,y,x,y -1 )
        }
        tree.insertKey(newNode)
    }
    if(moveAllowed(currBoard,x,y + 1)) {
        currBoard[y][x] = "blacktile.png";
        board[y + 1][x] = "pacman_open.png";
        b = currBoard;

        if(goal(b))
            return true;

        var newNode = { 
            gameState:b,
            pacX:x,
            pacY:y + 1 ,
            gVal:currCost + 1,
            key:getManhattanDist(x,y,x,y  + 1 )
        }
        tree.insertKey(newNode)
    }
    if(moveAllowed(currBoard,x-1,y)) {
        currBoard[y][x] = "blacktile.png";
        board[y][x - 1] = "pacman_open.png";
        b = currBoard;

        if(goal(b))
            return true;

        var newNode = { 
            gameState:b,
            pacX:x-1,
            pacY:y ,
            gVal:currCost + 1,
            key:getManhattanDist(x,y,x - 1,y )
        }
        tree.insertKey(newNode)
    }
    if(moveAllowed(currBoard,x + 1,y)) {
        currBoard[y][x] = "blacktile.png";
        board[y][x + 1] = "pacman_open.png";
        b = currBoard;

        if(goal(b))
            return true;

        var newNode = { 
            gameState:b,
            pacX:x + 1,
            pacY:y ,
            gVal:currCost + 1,
            key:getManhattanDist(x,y,x + 1,y )
        }
        tree.insertKey(newNode)
    }

    return false;
}


function astar (b,x,y){ 
    var tree = new minHeap();
    var boardObj = {
        gameState:b,
        pacX:x,
        pacY:y,
        gVal:0, //current path cost
        key:0 //heurstic function + current cost
    }

    var numPopped = 0;
    
    tree.insertKey(boardObj);
    while(tree.getSize() > 0) {
        numPopped += 1;
        if(generateChilds(tree)){
            console.log("solved bbyz");
            console.log(numPopped);
            return ;
        }

    }
    console.log("failed")
}




function printPacman( imgType) { 
    if(imgType == 1) {
        return "pacman_open.png";
    }
    else {
        return "pacman_closed.png";
    }
}

function generateBoard() {
    
    var board = new Array(numRows);

    board[0] = new Array(numCols).fill("tile.png");
    board[numRows - 1] = new Array(numCols).fill("tile.png");
    for(var i = 1; i < numRows - 1; i++) 
      board[i] = new Array(numCols).fill("dots.jpg");


  
    for(var i = 0; i < numRows;i++) {
        board[i][0] = "tile.png";
        board[i][numCols -1] = "tile.png";
    }

  //Add functions that generate these shapes given a starting position 
/*
  for(var i = 0; i < 6; i++){ 
    board[4][2 + i] = "tile.png";
    board[2][2 + i] = "tile.png";
  }

  for(var i = 0; i < 2; i++){ 
    board[6 + i][2] = "tile.png";
    board[6 + i][7] = "tile.png";
  }
  board[6][3] = "tile.png";
  board[6][6] = "tile.png";
  board[7][6] = "tile.png";
  board[8][4] = "tile.png";   */
  return board
}
function printBoard(board){

    var src=document.getElementById("board");

    for(var i = 0; i < numRows; i ++) {
        for(var j = 0; j < numCols; j ++) {
            var bTile = document.createElement("img");
            bTile.src = board[i][j];
            bTile.style.width="5%";
            bTile.style.height="5%";
            src.appendChild(bTile);
        }
        var line = document.createElement("p");
        src.appendChild(line);
    }
}


function printBoard(board){
    var src=document.getElementById("board");
    for(var i = 0; i < numRows; i ++) {
        for(var j = 0; j < numCols; j ++) {
            var bTile = document.createElement("img");
            bTile.style.backgroundColor= "transparent"
            bTile.src = board[i][j];
            bTile.style.width="5%";
            bTile.style.height="5%";
            src.appendChild(bTile);
        }
        var line = document.createElement("p");
        src.appendChild(line);
    }
}

/**
 * score does fruitPoint - currentNumber of Steps taken)
 * dots: +3
 * step: - 1
**/
function updateScore(tile) {
    if(tile == "dots.jpg")
        currScore = currScore + 2;
    else
        currScore= currScore - 1;

}

function printScore() {
    var score=document.getElementById("scoreValue");
    score.innerHTML ="";
    var s = document.createTextNode(currScore);
    score.appendChild(s)
}


function analyzeMove() {
    updateScore(board[y][x])
    printScore()
    board[y][x] = "pacman_open.png";
    
    document.getElementById("board").innerHTML = "";
    printBoard(board)
    if(goal(board))
    {
        won = document.getElementById("won");
        wonText = document.createTextNode("YOU WON!");
        won.appendChild(wonText);
    }
}

var currScore = 0
printScore()
board = generateBoard();
aboard = board.slice();
x = numRows / 2
y = numCols / 2
board[y][x] = "pacman_closed.png"
printBoard(board)
console.log(board)
console.log("begin")
astar(aboard,x,y)
console.log(board)
console.log("end")
$(document).keydown(function(event) {
    var key = event.which;
    switch(key) {
      case 37: //left arrow
            if(board[y][x-1] =="tile.png")
                break;
            board[y][x] = "blacktile.png";
            x = x-1;
            analyzeMove(y,x);
            break;
        case 38: //up arrow
            if(board[y - 1][x] == "tile.png")
                break;

            board[y][x] = "blacktile.png";
            y = y - 1;
            analyzeMove(y,x);
            break;
        case 39: //right arrow
            if(board[y][x + 1] == "tile.png")
                break;
            board[y][x] = "blacktile.png";
            x = x + 1;
            analyzeMove(y,x);
            break;
        case 40: //down arrow
            if(board[y + 1][x] == "tile.png")
                break;
            board[y][x] = "blacktile.png";
            y = y + 1;
            analyzeMove(y,x);
            break;
    }
});
