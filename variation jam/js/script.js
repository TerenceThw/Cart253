/**
 * Terrible New Car
 * Pippin Barr
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let gameOver=false;
let colms;               //colums for the grid
let rows;                //rows for the grid
let size=40;             //size of each grid, both width and height
let board=[];
let bomb; 
let food;
let player;
let dir;                 //direction of the player
let length =1;
let timeCount =100;      //counte when the bomb will start chasing the player 

function setup(){
  createCanvas(400,400);
  frameRate(5);
  colms = width/size;
  rows = height/size;
  bomb = createVector(int(random(0,colms)),int(random(0,rows)));            //set the bomb to random variables
  player = createVector(int(random(0,colms)),int(random(0,rows)));          //set player to random variables
  food   = createVector(int(random(0,colms)),int(random(0,colms)));
  dir    = createVector(0,0);                                               // set the value to 0, will be moving accoridng to the keyboard press
  
  for (let i=0; i<colms; i++){
    board[i]=[];
    for(let j=0; j<rows; j++){
     board[i][j]=0;   
      
    }
  }
}

function draw(){
  
  
  if(gameOver==false){
  board[player.x][player.y]= length;
  board[bomb.x][bomb.y]=-1;
  board[food.x][food.y]= 2
  };
  
  background(225);
  drawBoard();
  update();
  
}


//update the location of the player and also create game over conditions
function update(){
  if(gameOver) return;            // stop uddate if gameover happen
  player.add(dir);                // control player's direction
  bombMovement();

  if(player.x<0||player.x>colms-1||player.y<0||player.y>rows-1){
    gameOver=true;
    print("GAME OVER, you touch the board!");
    
  } else if (player.equals(bomb)){                //this condition need to be change in the future, not the right condition for the game!
    gameOver=true;
    print("Game Over! you got kill by the bomb.");

  }else if (dist(player.x,player.y,food.x,food.y)==0){
    food=createVector(int(random(0,colms)),int(random(0,rows)));


    


  }else{
      
    board[player.x][player.y]=1+length;          //add 1 so to make player become 2, since if player is 1, it will get remove.
  
   removeTail();
  }
  
}

function bombMovement(){                       //movement of the bomb
 
    if(bomb.x>player.x){
        bomb.x-=1;
        timeCount=100;                          //count 100 before it start chasing the player
        while (timeCount>0){                                    

        }
    } else if(bomb.x<player.x){
        bomb.x+=1;
        timeCount=100;   
        while (timeCount>0){
            timeCount-=1;

        }
    } 
 
    else if (bomb.y>player.y){
        bomb.y-=1;
        timeCount=100;   
        while (timeCount>0){
            timeCount-=1;

        }
    } else if (bomb.y<player.y){
        bomb.y+=1;
        timeCount=100;   
        while (timeCount>0){
            timeCount-=1;

        }
    }



}




function removeTail(){                          //remved the path that follow player
  for(let i=0; i<colms; i++){
    for(let j=0; j<rows; j++){
     if(board[i][j]>0){
       board[i][j]-=1;
       
     } 
    }
  }
}



function drawBoard(){
  
  for (let i=0; i<colms; i++){
    
    for(let j=0; j<size; j++){
      
      if(board[i][j]==0){
        fill(255);
        
      }else if(board[i][j]==-1){
        fill(255,0,0);
        
      }else if(board[i][j]==1){
        fill(255,255,0);

      }else if(board[i][j]==2){
        fill(0,0,255);
      }        
      
      rect(i*size, j*size, size, size);
  
      textAlign(CENTER,CENTER);
      fill(0);
      textSize(10);
      text(board[i][j],size/2+i*size,size/2+j*size);
      
   }
  }
}

function keyPressed(){
  if (keyCode== LEFT_ARROW){
    dir=createVector(-1,0);
  }else if(keyCode== RIGHT_ARROW){
    dir=createVector(1,0);
  }else if(keyCode==UP_ARROW){
    dir=createVector(0,-1);
  }else if(keyCode== DOWN_ARROW){
    dir=createVector(0,1);
  }
}
