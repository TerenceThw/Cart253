/**
 * the Virus
 * Terence Tamg
 * 
 * you, as a scientist, try to save the world from 
 * letting the virus explode. You can either do nothing 
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
        

    fill:{
        r:0,  //the color red, a value will be add later 
        g:0,  //the color green, a value will be add later 
        b:0   //the color blue, a value will be add later 
    }
    }
];


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
    for (let virus of viruses){
        moveVirus(virus);
        drawVirus(virus);
    }
}

//create a new virus with diffrent random variables
function  createVirus(){
   let virus= {
        x: random(0,100),
        y: random(0,100),
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
    if(viruses.length<40){           //virus will be add whenever you click the virus, until virus reach 29
        let virus =createVirus();
        viruses.push(virus);

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
    fill (virus.fill.r,virus.fill.g,virus.fill.b);    //need to modify!
    ellipse(virus.x, virus.y, virus.size);
    pop();

}

