/**
 * Escape the bomb
 * Terence Tang
 * 
 * A game which the player need to eat the fruit before the bomb kill you! Avoid touch the board or the bomb.
 * 
 * Controls:
 * use left, right,up and down arrow to move the character and eat the fruit.
 * click enter to start the game
 * 
 * 
 * Uses:
 * p5.js
 * 
 */


let gameState = "instructions"  // the game will start with an instruction page
let gameOver = false;          //condition to make game over message appear
let gameWon = false;       //condition to make win message appear
let colms;               //colums for the grid
let rows;                //rows for the grid
let size = 40;             //size of each grid, both width and height
let board = [];
let bomb;
let food;
let player;
let dir;                 //direction of the player
let timeCount = 30;      //counte when the bomb will start chasing the player 
let length = 1;



function setup() {

  createCanvas(400, 400);
  frameRate(5);
  colms = width / size;
  rows = height / size;
  bomb = createVector(int(random(0, colms)), int(random(0, rows)));            //set the bomb to random variables
  player = createVector(int(random(0, colms)), int(random(0, rows)));          //set player to random variables
  food = createVector(int(random(0, colms)), int(random(0, rows)));
  dir = createVector(0, 0);                                                    // set the value to 0, will be moving accoridng to the keyboard press

  for (let i = 0; i < colms; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;

    }
  }
}


function draw() {

  if (gameState === "instructions") {
    showInstructions();
  } else if (gameState === "playing") {
    playGame();
  }

  if (gameOver) {
    showGameOver();
  }else if (gameWon){
    showGameWon();
  }
}


/**
 *show the game instruction
 */
function showInstructions() {                                   
  background(255);
  textAlign(CENTER, CENTER);
  fill(192, 0, 0);
  textSize(48);
  text("INSTRUCTIONS", width / 2, height / 3);

  textSize(19);
  fill(0, 0, 0);
  text(".Use arrows keys to move ", width / 2, height / 1.9);
  fill(255, 0, 0);
  text(".The bomb will kill you", width / 2, height / 1.65);
  fill(0, 0, 0);
  text(".You touch the board, you die", width / 2, height / 1.43);
  fill(0, 0, 255);
  text(".You eat the fruit and you win", width / 2, height / 1.3);
  fill(0, 0, 0);
  textSize(28);
  text("Click ENTER to start the game", width / 2, height / 1.1);

}

/**
 *start the game
 */
function playGame() {
  if (gameOver) return;      // if gameover, stop the game

  background(225);
  board[player.x][player.y] = length;
  board[bomb.x][bomb.y] = -1;
  board[food.x][food.y] = 2;

  drawBoard();
  update();
}

/**
 *update the location of the player and also create game over conditions
 */
function update() {
  if (gameOver||gameWon) return;            // stop uddate if gameover happen
  player.add(dir);                // control player's direction
  bombMovement();

  if (player.x < 0 || player.x > colms - 1 || player.y < 0 || player.y > rows - 1) {
    gameOver = true;

  } else if (player.x === bomb.x && player.y === bomb.y) {                //this condition need to be change in the future, not the right condition for the game!
    gameOver = true;

  } else if (dist(player.x, player.y, food.x, food.y) == 0) {
    gameWon =true;
  } else {

    board[player.x][player.y] = 1 + length;          //add 1 so to make player become 2, since if player is 1, it will get remove.

    removeTail();
  }

}


/**
 *movement of the bomb
 */
function bombMovement() {

  //count 30 before it start chasing the player
  if (timeCount > 0) {
    timeCount -= 1;
    return;

  }

  board[bomb.x][bomb.y] = 0;

  if (bomb.x > player.x) {
    bomb.x -= 1;
    
  } else if (bomb.x < player.x) {
    bomb.x += 1;

  }

  else if (bomb.y > player.y) {
    bomb.y -= 1;

    
  } else if (bomb.y < player.y) {
    bomb.y += 1;

  
  }
  board[bomb.x][bomb.y] = -1;

}



/**
 *remved the path that follow player
 */

function removeTail() {
  for (let i = 0; i < colms; i++) {
    for (let j = 0; j < rows; j++) {
      if (board[i][j] > 0) {
        board[i][j] -= 1;

      }
    }
  }
}



/**
 *draw the board
 */
function drawBoard() {

  for (let i = 0; i < colms; i++) {

    for (let j = 0; j < rows; j++) {

      if (board[i][j] == 0) {
        fill(255);

      } else if (board[i][j] == -1) {
        fill(255, 0, 0);

      } else if (board[i][j] == 1) {
        fill(255, 255, 0);

      } else if (board[i][j] == 2) {
        fill(0, 0, 255);
      }

      rect(i * size, j * size, size, size);

      textAlign(CENTER, CENTER);
      fill(0);
      textSize(10);
      text(board[i][j], size / 2 + i * size, size / 2 + j * size);

    }
  }
}



/**
 * press enter to start the game
 * use up, down, left and right arrow to contorl the character
 */
function keyPressed() {

  if (gameState === "instructions" && keyCode === ENTER) {
    gameState = "playing";
  }

  if (gameState === "playing") {
    if (keyCode == LEFT_ARROW) {
      dir = createVector(-1, 0);
    } else if (keyCode == RIGHT_ARROW) {
      dir = createVector(1, 0);
    } else if (keyCode == UP_ARROW) {
      dir = createVector(0, -1);
    } else if (keyCode == DOWN_ARROW) {
      dir = createVector(0, 1);
    } else if (gameOver && keyCode === ENTER) {
      resetGame();
    }else if (gameWon && keyCode === ENTER) {
      resetGame();
    }
  }
}


/**
 * press enter to start the game
 * restart the game
 */
function resetGame() {
  gameOver = false;
  gameWon = false;
  gameState = "playing";
  player = createVector(int(random(0, colms)), int(random(0, rows)));
  bomb = createVector(int(random(0, colms)), int(random(0, rows)));
  food = createVector(int(random(0, colms)), int(random(0, rows)));
  timeCount = 30;
  length =1;
  dir = createVector(0, 0);

  for (let i = 0; i < colms; i++) {          //reset the grid, in order to prevent multiple bomb appear.
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
}

/**
 *show the gameOver mesasge
 */
 function showGameOver() {
  background(204, 153, 0);
  textAlign(CENTER, CENTER);
  fill(192, 0, 0);
  textSize(32);
  text("GAME OVER", width / 2, height / 2);
  textSize(16);
  fill(0, 0, 0);
  text("Press ENTER to restart", width / 2, height / 1.5);
}

/**
 *show the gameWon mesasge
 */
function showGameWon(){
  background(0, 74, 173);
  textAlign(CENTER, CENTER);
  fill(139, 0, 0);
  textSize(32);
  text("You Win!", width / 2, height / 2);
  textSize(16);
  fill(0, 0, 0);
  text("Press ENTER to restart", width / 2, height / 1.5);
}