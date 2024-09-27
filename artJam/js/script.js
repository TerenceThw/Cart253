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
        speed: 5

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
        x: random(0,width),
        y: random(0,height),
        size: random(10,250),
        direction: random(2,5),   //modify this late on !

   } ;
        return virus;
}

//make the mouse interact with the virus
function mousePressed(){
    if(viruses<30){           //virus will be add whenever you click the virus, until virus reach 29
        let virus =createVirus();
        viruses.push(virus);

    }
}

//viruses will be moving randomly according to the direction
function moveVirus(virus){
    virus.x+= random(-speed,speed);
    virus.y+= random(-speed,speed);
}

