


let frog = {

    x:320,
    y: 480,
    size: 100,
    tongue: {
        x: 320,
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
    speed: 3
};

let showInfoMessage =true; // make sure the information message stay when the timmer is higher then 0
let infoTimer =6;               // timer set to count when the instruction message will disappear
let instruction ="hello world";   // the game instruction


function setup(){

    createCanvas(640,480);
}



function draw(){

    background(135, 206, 235);
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();

    if(infoTimer >0){                          //the instruction page
        if(frameCount % 60 === 0){

            infoTimer--;
        }
    } else{
        showInfoMessage=false;
    }

    if (showInfoMessage){
        textSize(20);
        fill(0);
        textAlign(CENTER,CENTER);
        text(instruction,width/2,height/2-30);


    }

}

function moveFly(){

    fly.x += fly.speed;
    if (fly.x >width){
        fly.x =0;
        fly.y = random(200,400);      //random y location  of the fly 
    }
}

function drawFly(){
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
    fill(0,255,0);                           //adjust this later for the frog color
    ellipse(frog.x, frog.y-frog.size/2,frog.size);

}

function checkTongueFlyOverLap(){
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