let frog = {

    x:320,
    y: 480,
    size: 100,
    Timer: 20,
    color:{
        g:0,
    },
    tongue: {
        x: 20,
        y: 480,
        size: 20,
        speed: 20,
        state: "idle"
    }
};

let fly ={

    x: 0,
    y: 200,
    size: 10,
    speed: 3,
    isApple: false                                             //fly is not an Apple until it get to the speciific condition
};

let backgroundRGB ={                                          //its now set in black, and it will be chagning when player click space

    r: 0,
    g: 0,
    b: 0,
    Timer: 20
};

let showInfoMessage =true; // make sure the information message stay when the timmer is higher then 0
let infoTimer =12  ;               // timer set to count when the instruction message will disappear
let instruction ="You’re a frog. Your mission? Catch flies. \nSimply move your mouse to glide, then click to snap \nyour tongue and snag a tasty fly. \nEach catch earns you one point. Press the spacebar to light up \nyour surroundings and see the flies better. But beware: \nnot everything in the air is edible! Stick to flies only, \nor you may regret your choice of snack.";   // the game instruction


function setup(){

    createCanvas(640,480);
}



function draw(){

    background(backgroundRGB.r, backgroundRGB.g, backgroundRGB.b);
    moveFly();
    drawFlyOrApple();
    moveFrog();
    moveTongue();        
    drawFrog();
    checkTongueFlyOverlap();

    if(infoTimer >0){                          //the instruction page
        if(frameCount % 60 === 0){             //this count 1 seconds

            infoTimer--;                      // time will be counting until it reach 0
        }
    } else{
        showInfoMessage=false;
    }

    if (showInfoMessage){                    //infos for the instruction
        textSize(20);
        fill('#ff00ff');
        textAlign(CENTER,CENTER);
        text(instruction,width/2,height/2-30);


    }

    if (backgroundRGB.Timer >0){                    //condition to set background back to black
        backgroundRGB.Timer--;  
    } else{
        backgroundRGB.g =0;
        backgroundRGB.b =0; 

        

    }
 
    if (frog.Timer >0){                           //condition to make frog disappear again
        frog.Timer--;
    } else{
        frog.color.g =0;
    }


}

function moveFly(){                              //make the fly move

    fly.x += fly.speed;
    if (fly.x >width){                          //make sure it go back to where its suppsoed to be at when its outside the canvas
        fly.x =0;
        resetFlyPosition();                     //random y location  of the fly 
    }
}

function resetFlyPosition(){                  //assign new fly to a random direction
    fly.x =0;
    fly.y = random (200,400);
    flyOrApple();                             // get to the next function that decide if the object is a fly or an APPLE

}

function flyOrApple(){                       //decide if the object is a fly or an apple

    let randomNumber =int(random(1,10));     //a set of random number is created

    if(randomNumber === 5){                 //if the number is 5, then the fly become an apple
        fly.isApple = true;
    }
}


function drawFlyOrApple(){                  //draw the fly or the apple

    if (fly.isApple)





    fill(0);
    ellipse(fly.x, fly.y, fly.size);

}

function moveFrog(){
    frog.x = mouseX;

}

function moveTongue(){
    frog.tongue.x = frog.x;
    if (frog.tongue.state==="outbound"){
        frog.tongue.y-= frog.tongue.speed;
        if(frog.tongue.y<=0){
            frog.tongue.state ="inbound";
        }

    } else if (frog.tongue.state ==="inbound"){
        frog.tongue.y += frog.tongue.speed;
        if (frog.tongue.y >=frog.y){
            frog.tongue.state ="idle";
            frog.tongue.y = frog.y;
        }
    }
}


function drawFrog(){
    stroke (255,0,0);
    strokeWeight(frog.tongue.size);
    ellipse(frog.tongue.x, frog.tongue.y,frog.tongue.size);
    line(frog.x, frog.y, frog.tongue.x, frog.tongue.y);

    noStroke();
    fill(0,frog.color.g,0);                           //color will be change according to the player (press space)
    ellipse(frog.x, frog.y, frog.size/2);             //the frog looks weird, make some change?   

}

function  checkTongueFlyOverlap(){
    let d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    if (d< frog.tongue.size/2+fly.size/2){
        fly.x =0;
        fly.y= random(100,400);
        frog.tongue.state="inbound";

    }
}

function mousePressed(){
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
  
}

function keyPressed(){  
    if (key==" ") {                                       //change the values when clicking space
    backgroundRGB.g = min(backgroundRGB.g+50,111);
    backgroundRGB.b = min(backgroundRGB.b+50,255);
    backgroundRGB.Timer =20;

    frog.color.g = min(frog.color.g+127.5);    
    frog.Timer =20;                                      //change the frog's color by adding 127.5  
    }
}