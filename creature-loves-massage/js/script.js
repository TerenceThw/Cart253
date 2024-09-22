/**
 * Creature Loves Massage
 * Pippin Barr
 * 
 * A creature that responds to mouse massage by changing colour
 */

"use strict";

// Our creature
const creature = {
    // Position
    x: 200,
    y: 200,
    // Size
    size: 200,
    // Fill
    fill: "#000000", // Starts out bored
    // Possible fills for the creature that show its mood
    // We'll need these when we start changing its colour
    // and its nice to keep them along with all the other info
    // about the creature
    fills: {
        bored: "#000000", // Black
        happy: "#33cc33", // Green
        angry: "#cc3333",// Red
        dead:  "#777777" // Grey
    },
    //is the creature alive
    alive: true,
    //how bored is the creature?
    boredomLevel: 0,
    //how bored can it get before it die?
    deathByBoredomThreshold:500,
};

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Fills the background, displays the creature 
 */
function draw() {
    background(255, 200, 127);

    checkInput();
    drawCreature();
}

/**
 * Responds to user input
 */
function checkInput() {

    if (!creature.alive){
        return;
    }

    const distance = dist(mouseX, mouseY, creature.x,creature.y);
    const mouseOverLapsCreature = (distance < creature.size/2);

    const mouseIsMoving = (movedX !==0 || movedY !==0);

   if (mouseOverLapsCreature && mouseIsMoving ) {
    creature.fill = creature.fills.happy;
}
else {
    creature.fill = creature.fills. bored;
    //creature gget a little bit more bored
    creature.boredomLevel +=1;
    if (creature.boreddomLevel > creature.deathByBoredomThreshold){
        //creeature dies of boredom
        creature.alive = false;
        //creature looks dead
        creature.fill = creature.fills.dead;
    }
}
}

/**
 * Draws the creature
 */
function drawCreature() {
    push();
    noStroke();
    // Use the creature's fill
    fill(creature.fill);
    // Display the creature at its position and size
    ellipse(creature.x, creature.y, creature.size);
    pop();
}