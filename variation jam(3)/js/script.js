/**
 * Escape the enemy
 * Terence Tang
 *
 * Remember Aesop’s fable? Now you’re the busy little ant, hustling to stash 32 pieces of food before winter comes!
 * But watch out—that pesky grasshopper is out to mess with you. If it bumps into you,
 * it’s game over. Will you gather it all before the cold sets in?
 *
 * Controls:
 * use left, right,up and down arrow to move the character and store the foods.
 * click enter to start the game
 *
 *
 * Uses:the iss
 * p5.js
 *
 */


let gameState = "instructions"  // the game will start with an instruction page
let gameOver = false;          //condition to make game over message appear
let gameWon = false;       //condition to make win message appear
let colms;               //colums for the grid
let rows;                //rows for the grid
let size = 50;             //size of each grid, both width and height
let board = [];
let enemy;
let foods = [];
let player;
let dir;                 //direction of the player
let timeCount = 50;      //counte when the genemy will start chasing the player 


function setup() {

  createCanvas(400, 400);
  frameRate(6);
  colms = width / size;
  rows = height / size;
  enemy = createVector(int(random(0, colms)), int(random(0, rows)));            //set the enemy to random variables
  player = createVector(int(random(0, colms)), int(random(0, rows)));          //set player to random variables
  dir = createVector(0, 0);                                                    // set the value to 0, will be moving accoridng to the keyboard press

  for (let i = 0; i < colms; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;

    }
  }
  generateFoods();                                                              //put inside setup, so taht food won't keep randomly geenrate
}

function foodLocationCheck(foodX, foodY) {                                                //this need to sepreate out with locationCheck  becasue, food cant be generate next to the board, while player and grasshopper can

  if (foodX === player.x && foodY === player.y) return true;
  if (foodX === enemy.x && foodY === enemy.y) return true;
  if (board[foodX][foodY] !== 0) return true;

  if (foodX <= 0 || foodX >= colms - 1 || foodY <= 0 || foodY >= rows - 1) return true;

  return false;

}


/**
 * generate food at random lcoation
 */
function generateFoods() {
  foods = [];
  for (let i = 0; i < 5; i++) {
    let foodX, foodY;
    do {
      foodX = int(random(0, colms));
      foodY = int(random(0, rows));
    } while (foodLocationCheck(foodX, foodY));

    foods.push({
      pos: createVector(foodX, foodY),
      value: getRandomFoodValue()
    });

    board[foodX][foodY] = foods[foods.length - 1].value;
  }
}

/**
 * create random value for each food
 */
function getRandomFoodValue() {
  const values = [2, 4, 8, 16];
  return values[int(random(0, values.length))];
}


/**
 * verify location of player and enemy so no food will be store on top of either plauer or enemy
 */
function positionCheck(x, y) {
  if (x === player.x && y === player.y) return true;
  if (x === enemy.x && y === enemy.y) return true;
  return board[x][y] !== 0;

}


function draw() {

  if (gameState === "instructions") {
    showInstructions();
  } else if (gameState === "playing") {
    playGame();
  }

  if (gameWon) {
    showGameWon();
  } else if (gameOver) {
    showGameOver();
  }
}


/**
 *show the game instruction
 */
function showInstructions() {
  background(255);
  textAlign(CENTER, CENTER);
  fill(192, 0, 0);
  textSize(46);
  text("Cold Survival", width / 2, height / 3);

  textSize(18);
  fill(0, 0, 0);
  text("You're the ant from Aesop's fable!", width / 2, height / 2.3);
  text("Push and combine food pieces to reach 32", width / 2, height / 1.9);
  text("Use arrow keys to move and push food", width / 2, height / 1.6);
  fill(0, 255, 0);
  text("Beware! The grasshopper will chase you", width / 2, height / 1.4);
  fill(0, 0, 0);
  textSize(16);
  text("Press ENTER to start your winter preparation", width / 2, height / 1.2);
}

/**
 *start the game
 */
function playGame() {
  if (gameOver) return;
  background(225);
  drawBoard();
  update();
  enemyMovement();
}


/**
 *update the location of the player and also create game over conditions
 */
function update() {
  if (gameOver || gameWon) return;            // stop uddate if gameover happen

  let nextPos = createVector(player.x + dir.x, player.y + dir.y);   //update player direction

  if (nextPos.x < 0 || nextPos.x > colms - 1 || nextPos.y < 0 || nextPos.y > rows - 1) {   // if player touch the board

    return;
  }

  if (nextPos.x === enemy.x && nextPos.y === enemy.y) {                // if player tocuh enemy
    gameOver = true;
    return;
  }

  let foodIndex = foods.findIndex(f => f.pos.x === nextPos.x && f.pos.y === nextPos.y);  //check if the food position matches with where the player try to move

  if (foodIndex !== -1) {
    let foodNextX = nextPos.x + dir.x;                              //move food according to player's movement
    let foodNextY = nextPos.y + dir.y;

    if (foodNextX >= 0 && foodNextX < colms && foodNextY >= 0 && foodNextY < rows) {

      let targetFoodIndex = foods.findIndex(f => f.pos.x === foodNextX && f.pos.y === foodNextY);       //check if there's food on the location where you push the food

      if (targetFoodIndex !== -1) {
        if (foods[foodIndex].value === foods[targetFoodIndex].value) {                             //if two food touch, check if they can combine
          let newValue = foods[foodIndex].value * 2;                                                // value*2 (since its either 2*2, 4*2, 8*2, 16*2)
          board[foods[foodIndex].pos.x][foods[foodIndex].pos.y] = 0;                               // set the old locatation where food store back to 0
          board[foods[targetFoodIndex].pos.x][foods[targetFoodIndex].pos.y] = newValue;           // give the new lcoation where targetFood store the new value
          foods[targetFoodIndex].value = newValue;                                                //update targetFood value
          foods.splice(foodIndex, 1);                                                             //remove the old food away

          let newFoodX, newFoodY;                                                              // create new food ,after two food are combined 
          do {
            newFoodX = int(random(0, colms));
            newFoodY = int(random(0, rows));

          } while (positionCheck(newFoodX, newFoodY));                                         //check if theres food on the same location

          foods.push({
            pos: createVector(newFoodX, newFoodY),
            value: getRandomFoodValue()

          });
          board[newFoodX][newFoodY] = foods[foods.length - 1].value;

          if (newValue >= 32) {                                                                    //check if the win condition is meet
            gameWon = true;
            return;

          }

        }

      } else if (!positionCheck(foodNextX, foodNextY)) {                                   //move food whiletheres no other food to combine
        board[foods[foodIndex].pos.x][foods[foodIndex].pos.y] = 0;
        foods[foodIndex].pos.x = foodNextX;
        foods[foodIndex].pos.y = foodNextY;
        board[foodNextX][foodNextY] = foods[foodIndex].value;

      }
    }
  }

  if (!positionCheck(nextPos.x, nextPos.y)) {                                               // players next move
    player = nextPos.copy();

  }
}


/**
 *movement of the enemy
 */
function enemyMovement() {


  if (timeCount > 0) {                                   //count 100 before it start chasing the player
    timeCount -= 1;
    return;
  }

  board[enemy.x][enemy.y] = 0;

  if (random(1) < 0.5) {                               // if random is less then 0.5 then it get to this condition, if its higher, it goes to the next condition
    if (enemy.x > player.x) {                           //enemy will start checking palyer's x asix and follow if they are not on the same x axis
      enemy.x -= 1;

    } else if (enemy.x < player.x) {
      enemy.x += 1;

    } else {                                         // if both are on the same x axis, then the enemy will move on the y axis      
      if (enemy.y > player.y) {
        enemy.y -= 1;

      } else if (enemy.y < player.y) {
        enemy.y += 1;
      }
    }

  } else {                                          // start with the y axis, when random is higher then 0.5

    if (enemy.y > player.y) {
      enemy.y -= 1;

    } else if (enemy.y < player.y) {
      enemy.y += 1;

    } else {

      if (enemy.x > player.x) {
        enemy.x -= 1;

      } else if (enemy.x < player.x) {

        enemy.x += 1;
      }
    }
  }
  board[enemy.x][enemy.y] = -1;
  if (enemy.x === player.x && enemy.y === player.y) {              //if emepy touches player, the game is over
    if (!gameWon) {                                                   //to make sure gaover will appear after gameWon
      gameOver = true;
      return;
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
      } else {

        switch (board[i][j]) {                   //different value will be assoicate with differnt colors
          case 2: fill(200, 200, 255); break;
          case 4: fill(150, 150, 255); break;
          case 8: fill(100, 100, 255); break;
          case 16: fill(25, 25, 255); break;

        }
      }


      if (i === player.x && j === player.y) {           //draw player
        fill(255, 255, 0);

      }

      if (i === enemy.x && j === enemy.y) {                //draw enemy
        fill(0, 255, 0);

      }

      rect(i * size, j * size, size, size);

      if (board[i][j] > 0) {                            //draw food with the value
        textAlign(CENTER, CENTER);
        fill(0);
        textSize(15);
        text(board[i][j], size / 2 + i * size, size / 2 + j * size);

      }
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
  enemy = createVector(int(random(0, colms)), int(random(0, rows)));
  timeCount = 50;
  dir = createVector(0, 0);

  for (let i = 0; i < colms; i++) {          //reset the grid, in order to prevent multiple enemy appear.
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
    }
  }
  generateFoods();
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
function showGameWon() {
  background(0, 74, 173);
  textAlign(CENTER, CENTER);
  fill(139, 0, 0);
  textSize(32);
  text("You Win!", width / 2, height / 2);
  textSize(16);
  fill(0, 0, 0);
  text("Press ENTER to restart", width / 2, height / 1.5);
}