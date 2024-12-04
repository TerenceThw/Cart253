/**
 * Escape the bomb
 * Terence Tang
 * 
 * .This is a game which the player need to eat the fruit,collect enough points  before the bomb kill you!
    use up, down, left, right arrow to control the player
    eat the food, collect the point and win the game!
 * 
 * Controls:
 * use left, right,up and down arrow to move the character and eat the fruit.
 * touch the math symbol first and then eat the food, in order to score the point
 * click enter to start/restart the game
 * 
 * 
 * Uses:
 * p5.js
 * 
 */


let gameState = "instructions"  // the game will start with an instruction page
let gameOver = false;          //condition to make game over message appear
let gameWon = false;       //condition to make win message appear
let score                // score that player will need to get in order to win the game
let currentMathValue = 1;

let colms;               //colums for the grid
let rows;                //rows for the grid
let size = 40;             //size of each grid, both width and height
let board = [];

let player;
let bomb;
let dir;                 //direction of the player
let timeCount = 50;      //counte when the bomb will start chasing the player 

let food;                 // for the location of the food
let foodValue;            // indicate the value of the food
let mathSigns = [];        // there will be multiples
let selectedSign = null;


function setup() {

  createCanvas(400, 400);
  frameRate(5);
  colms = width / size;
  rows = height / size;
  score = int(random(20, 60));
  bomb = createVector(int(random(0, colms)), int(random(0, rows)));            //set the bomb to random variables
  player = createVector(int(random(0, colms)), int(random(0, rows)));          //set player to random variables
  food = createVector(int(random(0, colms)), int(random(0, rows)));
  foodValue = int(random(2, 11));                                              //point player will get by eating the fruit
  dir = createVector(0, 0);                                                    // set the value to 0, will be moving accoridng to the keyboard press
  generateMathSigns();

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
  } else if (gameWon) {
    showGameWon();
  }
}


/**
 *create random math sign (+,-,*,/)
 */
function generateMathSigns() {
  mathSigns = [];  // Clear existing signs
  let operations = ['+', '-', '*', '/'];


  for (let i = 0; i < 2; i++) {     //create two signs
    let sign = {
      pos: createVector(int(random(0, colms)), int(random(0, rows))),
      operation: operations[int(random(0, operations.length))]
    };
    mathSigns.push(sign);
  }
}



/**
 *show the game instruction
 */
function showInstructions() {
  background(200); // Set a light gray background
  textAlign(CENTER, CENTER); // Ensure all text is horizontally and vertically centered
  fill(192, 0, 0);
  textSize(48);
  text("INSTRUCTIONS", width / 2, height / 3.5); // Adjusted to keep title centered and well-placed

  textSize(20);
  let lineSpacing = 30; // Set spacing between lines
  let startHeight = height / 2.5; // Starting point for the instruction text

  fill(0, 0, 0);
  text("Use arrow keys to move", width / 2, startHeight);
  fill(255, 0, 0);
  text("Avoid the bomb or you die", width / 2, startHeight + lineSpacing);
  fill(0, 0, 0);
  text("Touch the edge, you die", width / 2, startHeight + 2 * lineSpacing);
  fill(0, 255, 0);
  text("Touch math symbols first", width / 2, startHeight + 3 * lineSpacing);
  fill(0, 177, 255);
  text("Then eat the food to score", width / 2, startHeight + 4 * lineSpacing);
  fill(0, 0, 0);
  text("Score to win: " + score, width / 2, startHeight + 5 * lineSpacing);
  text("Press ENTER to start", width / 2, startHeight + 6 * lineSpacing);
}

/**
 *start the game
 */
function playGame() {
  if (gameOver) return;      // if gameover, stop the game

  background(225);

  for (let i = 0; i < colms; i++) {     //  reset everything to 0 to avoid the tail
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }

  board[player.x][player.y] = 1;
  board[bomb.x][bomb.y] = -1;
  board[food.x][food.y] = foodValue;

  drawBoard();
  update();
}

/**
 *update the location of the player and also create game over conditions
 */
function update() {
  if (gameOver || gameWon) return;            // stop uddate if gameover happen

  let locationX = player.x + dir.x;             // locationX as the player direction x control by the arrow 
  let locationY = player.y + dir.y;             //locationY as the  player direction y control by the arrpw 

  if (locationX >= 0 && locationX < colms && locationY >= 0 && locationY < rows) {    // check player's next move
    player.x = locationX;
    player.y = locationY;
  } else {
    gameOver = true;
    return;
  }

  bombMovement();
  if (player.x === bomb.x && player.y === bomb.y) {
    gameOver = true;

  } else {

    mathSigns.forEach((sign, index) => {                               //vertify each sign seperately
      if (player.x === sign.pos.x && player.y === sign.pos.y) {       //player touch the sign
        selectedSign = sign;
        mathSigns.splice(index, 1);

        let operations = ['+', '-', '*', '/'];              //4 different possibilities            
        let newSign = {
          pos: createVector(int(random(0, colms)), int(random(0, rows))),
          operation: operations[int(random(0, operations.length))]

        };
        mathSigns.push(newSign);

      }
    });


    if (selectedSign && player.x === food.x && player.y === food.y) {
      switch (selectedSign.operation) {
        case '+':
          currentMathValue += foodValue;
          break;
        case '-':
          currentMathValue -= foodValue;
          break;
        case '*':
          currentMathValue *= foodValue;
          break;
        case '/':
          currentMathValue = int(currentMathValue / foodValue);
          break;

      }
      selectedSign = null;
      food = createVector(int(random(0, colms)), int(random(0, rows)));
      foodValue = int(random(2, 11));

      if (currentMathValue >= score) {
        gameWon = true;

      }
    }
  }

}


/**
 *movement of the bomb
 */
function bombMovement() {

  //count 10 seconds before it start chasing the player
  if (timeCount > 0) {
    timeCount -= 1;
    return;

  }

  board[bomb.x][bomb.y] = 0;   //so that the bomb creates no tail


  if (random(1) < 0.5) {             //a 50% chance move on the x direction
    if (bomb.x > player.x) {
      bomb.x -= 1;


    } else if (bomb.x < player.x) {
      bomb.x += 1;

    }


  } else if (bomb.y > player.y) {
    bomb.y -= 1;


  } else if (bomb.y < player.y) {
    bomb.y += 1;


  }
  board[bomb.x][bomb.y] = -1;

}



function drawBoard() {
  textAlign(CENTER, CENTER);
  textSize(10);

  for (let i = 0; i < colms; i++) {

    for (let j = 0; j < rows; j++) {

      if (board[i][j] == 0) {
        fill(255);

      } else if (board[i][j] == -1) {
        fill(255, 0, 0);

      } else if (player.x === i && player.y === j) {
        fill(255, 255, 0);

      } else {
        fill(0, 177, 255);
      }

      rect(i * size, j * size, size, size);
      fill(0);

      mathSigns.forEach(sign => {                               //generate math sign
        if (sign.pos.x === i && sign.pos.y === j) {
          fill(0, 255, 0);  // Math signs are green
          rect(i * size, j * size, size, size);
          fill(0);  // Black text
          text(sign.operation, i * size + size / 2, j * size + size / 2);
        }
      });


      if (i === food.x && j === food.y) {                       //present the value of the food
        text(foodValue, i * size + size / 2, j * size + size / 2);

      } else if (i === player.x && j === player.y) {            //show player's score
        text(currentMathValue, i * size + size / 2, j * size + size / 2);

      } else if (board[i][j] !== 0) {                              //keep the grid empty, 
        text(board[i][j], i * size + size / 2, j * size + size / 2);
      }
    }
  }

  textSize(16);
  fill(0);

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
    } else if (gameWon && keyCode === ENTER) {
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
  gameState = "instructions";
  player = createVector(int(random(0, colms)), int(random(0, rows)));
  bomb = createVector(int(random(0, colms)), int(random(0, rows)));
  food = createVector(int(random(0, colms)), int(random(0, rows)));
  foodValue = int(random(2, 11));
  timeCount = 50;
  score = int(random(20, 60));
  dir = createVector(0, 0);
  currentMathValue = 1;

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
  background(255, 205, 0);
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
function showGameWon() {
  background(255, 205, 0);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(32);
  text("YOU WIN!", width / 2, height / 2);
  textSize(16);
  text("Final Score: " + currentMathValue, width / 2, height / 1.7);
  text("Press ENTER to restart", width / 2, height / 1.5);
}