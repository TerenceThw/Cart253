/**
 * Lines
 * Pippin Barr
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
    colorMode(HSB);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    background(0);
    
let currentStrokeWeight =1;
let x =0;
let y=0;

for( let i =0;i<height; i++){
  let hueValue= map(i,0,height,0,360);
  stroke(hueValue,200,100);
  line(0,i,width,i);

}

while (x<width) {
  stroke(x/2);
  strokeWeight(currentStrokeWeight);
  line(x,0,x,height);
  x+=50;
  currentStrokeWeight=1;

}

while (y<height) {
  stroke(y/2);
  strokeWeight(currentStrokeWeight);
  line(0,y,width,y);
  y+=50;
  currentStrokeWeight=1;

}



}