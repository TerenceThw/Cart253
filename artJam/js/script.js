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

// created the arraly of virus
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

