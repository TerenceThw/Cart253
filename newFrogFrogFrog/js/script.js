
let gameOver =false;                                       //false, becasue the game is not over yet.
let restartButton  = undefined;

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

let showInfoMessage =true;                                   // make sure the information message stay when the timmer is higher then 0
let infoTimer =12  ;                                         // timer set to count when the instruction message will disappear
let instruction ="You’re a frog. Your mission? Catch flies. \nSimply move your mouse to glide, then click to snap \nyour tongue and snag a tasty fly. \nEach catch earns you one point. Press the spacebar to light up \nyour surroundings and see the flies better. But beware: \nnot everything in the air is edible! Stick to flies only, \nor you may regret your choice of snack.";   // the game instruction

let appleImg;

function preload(){
    appleImg = loadImage('newApple-Logo.png');                //load the image        
}


function setup(){

    createCanvas(640,480);

    restartButton = createButton('RESTART GAME');           //create button to restart the game
    restartButton.position(width/2+380 , height/2+300);     // i just test and adust the numbers in order to make it center 
    restartButton.mousePressed(restartGame);
    restartButton.hide();                                   //hide the button until player see the game over message

}


 
function draw(){

    if (gameOver===true){
        gameOverMessage();                     //show the gameover message
        restartButton.show();                  //show the restart button
        return;
    }else {
        restartButton.hide();
    }

    background(backgroundRGB.r, backgroundRGB.g, backgroundRGB.b);
    moveFly();
    drawFlyOrObject();
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
    if (fly.x >width){
        fly.x =0;
        resetFlyPosition();                     //random y location  of the fly 
    }
}

function resetFlyPosition(){                   //assign new fly to a random direction
    fly.x =0;
    fly.y = random (200,400);
    appleOrFly();                             // get to the next function that decide if the object is a fly or an APPLE

}

function appleOrFly(){
    let randomNumber = int(random(1,3));  

    if (randomNumber ===2){                   //if the random number being pick is 2, then fly become an apple!
        fly.isApple =true;

    } else{
        fly.isApple= false;
    }
}

function drawFlyOrObject(){

    if(fly.isApple===true){                      //display the apple
        image(appleImg,fly.x,fly.y,fly.size*7,fly.size*4)
    }                    

    else if(fly.isApple===false){                //display the fly
        fill(0);
        ellipse(fly.x, fly.y, fly.size);
    }
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
        if(fly.isApple===true){                          //lead to the gameOverMessage  function
            gameOverMessage();
        }
        else {

            fly.x =0;
        fly.y= random(100,400);
        appleOrFly();
        frog.tongue.state="inbound";
        }
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

function gameOverMessage() {                             //show the gameOver message 
    gameOver =true;
    background(0);
    textSize(20);
    fill(255,0,0);
    textAlign(CENTER,CENTER);
    text("GAME OVER! \nMaybe be more careful what you eat in your next life. \nAssuming, of course, you even get one… \n(Seriously, why on Earth would you eat a bitten apple?)", width/2, height/2);

}

function restartGame(){

        gameOver =false;


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
            isApple: false                                            
        };

        let backgroundRGB ={                                          

            r: 0,
            g: 0,
            b: 0,
            Timer: 20
        };

        showInfoMessage = true;
        infoTimer = 20;





}