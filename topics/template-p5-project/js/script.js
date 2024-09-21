/**
 * Mr. Furious
 * terence
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};

//sky
let sky = {
    r:0,
    g:0,
    b:255,
}

// jsut an orfinary birdddddd

let bird ={
x:10,
y:200,
size:50,
    fill:{
        r: 50,
        g:200,
        b:100,
    }


}


/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  background(sky.r, sky.g, sky.b);

  //turn the sky black

  sky.b = sky.b-1;

  


  //Mr Furious is geting angry (change face color)
   
  mrFurious.fill.g=mrFurious.fill.g-1;
  mrFurious.fill.b=mrFurious.fill.b-1;

  //Mr Furious need to shake 

  mrFurious.y=mrFurious.y-0.5;
  mrFurious.y=constrain(mrFurious.y, 0,400)
  
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();

//The bird
    push();
    fill(bird.fill.r,bird.fill.g,bird.fill.b);
    ellipse(bird.x,bird.y,bird.size)
    pop();

 //Move the Bird
    bird.x=bird.x+1;

}