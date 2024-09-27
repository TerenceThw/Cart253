/**
 * the Virus
 * Terence Tamg
 * 
 * you, as a scientist, try to save the world from 
 * letting the virus escape  the lab. You can either do nothing 
 * or try to stop the virus from spreading among the public.
 * 
 * contorls:
 * - use the mouse to stop the virus (or not)
 * 
 * uses:
 * p5.ps
 * https://p5js.org
 */

"use strict";

// create the arraly of virus
// There will be one virus when the game starts
let viruses =[
    {
        x: 300,
        y: 300,
        size: 100,
        xDirection: 1, //need to be change
        yDirection: 0.5, //need to be change

    fill:{
        r:200,  //the color red, a value will be add later 
        g:0,  //the color green, a value will be add later 
        b:100   //the color blue, a value will be add later 
    }
    }
];

//check if the game is over 
let gameOver = false;

//the maximum amount of virus we can have
let maxViruses = 30;


/**
 *  created a 600x600 canvas
*/
function setup() {
    createCanvas(600,600);
    
}


/**
 * move and display the viruses
*/
function draw() {
    background("#000000");

    // go through all the virus
    if(!gameOver){
    for (let virus of viruses){
        moveVirus(virus);
        drawVirus(virus);
    }
} else {              //this message will be show when the game end
    fill(255,0,0);
    textSize(25);
    textAlign(CENTER,CENTER);
    text(" and humanity is in for a rough ride.",width/2,height/2 );
    text("You tried your best, but the virus is now free,",width/2,height/2-30 );

}

}
//create a new virus with diffrent random variables
function  createVirus(){
   let virus= {
        x: mouseX,
        y: mouseY,
        size: random(50,400),
        xDirection: random(0.5,5),   //need to modify
        yDirection: random(0.5,5),   //need to mdify
        fill:{
            r: random(50,255),
            g: random(50,255),
            b: random(50,255)

        }
   } ;
        return virus;
}

//make the mouse interact with the virus
function mousePressed(){
    if(viruses.length<maxViruses){           //virus will be add whenever you click the virus, until virus reach 29
        let virus =createVirus();
        viruses.push(virus);

    }
    else if(viruses.length==maxViruses){
        gameOver= true;  // the game is over
    }
}

//viruses will be moving randomly according to the direction
function moveVirus(virus){
    virus.x+= random(virus.xDirection);   //need to modify
    virus.y+= random(virus.yDirection);   //need to modify
    

}


// draw the virus
function drawVirus(virus){
    push();
    fill (virus.fill.r,virus.fill.g,virus.fill.b);   //ach virus will have a different color
    ellipse(virus.x, virus.y, virus.size);
    pop();

}

