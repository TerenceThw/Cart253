/**
 * The greatest record of all time
 * Terence
 * 
 * Display the  greatest record
 */

"use strict";

/**
 * set up the canvas.
*/
function setup() {
   createCanvas(640,640);
}

/**
 * DRAW the record
*/
function draw() {
    push();
    background(150, 150, 150);
    fill(250,0,0);
    stroke(255);
    ellipse(320,320,480);
    pop();

    push();
    fill("white");
    noStroke();
    ellipse(320,320,140);
    pop();

    push();
    fill("#000000");
    noStroke();
    ellipse(320,320,20,);
    pop();
}   