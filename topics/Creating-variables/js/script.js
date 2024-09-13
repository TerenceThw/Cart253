/**
 * creating variables
 * Pippin Barr
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

let holeShade= 180;
let holeSize = 150;
let holeX =140;
let holeY =175;
/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(480,480);
}


/**
 * *draw a hole in a piece of cheese
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {

    background(cheeseRed, cheeseGreen, cheeseBlue);

    //the hole
    push();
    noStroke();
    fill(0)
    ellipse(holeX,holeY,holeSize);
    pop();

}