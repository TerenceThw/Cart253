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
/** 
* create the arraly of virus
* There will be one virus when the game starts
*/
let viruses =[
    {
        x: 300,
        y: 300,
        size: 100,
        xDirection: 1,   //need to be change
        yDirection: 0.5, //need to be change

    fill:{
        r:200,  //the color red, a value will be add later 
        g:0,    //the color green, a value will be add later 
        b:100   //the color blue, a value will be add later 
    }
    }
];

let gameOver = false;     //check if the game is over 

let showInfoMessage = true;   //make the info message stay when the infoTimmer is higher then 0


let maxViruses = 20;     //the maximum amount of virus we can have

let infoTimer = 4;      //cout the time when will the info message dissapear



let timer =10;            // count the time when will the first ending pop out

//instruction message
let infomessage="The virus seems to be multiplying—rapidly, \nalmost enthusiastically. \nIt’s seconds from escaping, \nand here I am, standing in a sterile lab, \npondering one simple choice: \nclick the mouse and stop it, or, \nquite simply, do nothing at all. \nClick or not to click—that’s the question.";

//message for ending 1
let message1 = "After managing to stop the virus, \nyou notice—almost casually—you’ve been infected. \nIn the quiet of the lab, \nyou straighten your coat, \nknowing the world outside will go on, without you.";
    

// message for ending2 
let message2 = "You gave it your all, but the virus has escaped, \nleaving humanity to embark on a \ndelightfully chaotic journey ahead."; 




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

    cursor(HAND);
    let bgColorR =map(viruses.length,0,maxViruses, 0, 255);   //changing the bg color according to the amount of viruses
    let bgColorG =map(viruses.length,0,maxViruses, 0, 100);   //changing the bg color according to the amount of viruses
    let bgColorB =map(viruses.length,0,maxViruses, 0, 100);   //changing the bg color according to the amount of viruses

    background(bgColorR,bgColorG,bgColorB);

    //make the info message stary for 7 secs
    if(showInfoMessage){
        if (frameCount%60==0){
            infoTimer--;
        }
    
        textSize(20);
        fill('#ff00ff');
        textAlign(CENTER,CENTER);
        text(infomessage,width/2,height/2-30);

    }
    else if(infoTimer<=0){
        showInfoMessage=false;

    }




    // go through all the virus
    if(!gameOver){                     //when there's less then 20 viruses in the game
    for (let virus of viruses){
        moveVirus(virus);
        drawVirus(virus);

        }

    } else if(gameOver){              //this message will be show when the player reach ending 2
    fill('#b30000');
    textSize(20);
    textAlign(CENTER,CENTER);
    text(message2,width/2,height/2-30 );

}

    if(frameCount%60==0&&timer>0){              //if the frameCount is divide by 60, then one second has passed. it will stop at 0
        timer--;
    }

    if(timer<=0){
        textSize(20);
        fill('#ff00ff');
        textAlign(CENTER,CENTER);
        text(message1,width/2,height/2-30);
        
        
    }
}

/** 
*create a new virus with diffrent random variables
*/
function  createVirus(){

   let virus= {
        x: mouseX,
        y: mouseY,
        size: random(50,400),
        xDirection: random(0.5,5),   //need to modify
        yDirection: random(0.5,5),   //need to mdify
        fill:{
            r: random(0,255),
            g: random(0,255),
            b: random(0,255)

        }
   } ;
        return virus;
}

/** 
*make the mouse interact with the virus
*/
function mousePressed(){
    if(viruses.length<maxViruses){           //virus will be add whenever you click the virus, until virus reach 20
        let virus =createVirus();
        viruses.push(virus);

    }
    else if(viruses.length==maxViruses){       //game is over when there are 20 viruses
        gameOver= true;  // the game is over
    }
}

/** 
*viruses will be moving randomly according to the direction
*/
function moveVirus(virus){
    virus.x+= random(virus.xDirection);   //need to modify
    virus.y+= random(virus.yDirection);   //need to modify
    
}

/** 
*draw the virus
*/
function drawVirus(virus){

    push();
    fill (virus.fill.r,virus.fill.g,virus.fill.b);   //each virus will have a different color
    ellipse(virus.x, virus.y, virus.size);
    pop();

}

/** 
*show the Front Page
*/
function FrontPage(){
    push();
    rectMode(CENTER);
    fill(0,0,0);
    textAlign(CENTER, CENTER);
    text(intromessage, width/2, height/2);
    pop();

}


