


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


fuction setup(){

    createCanvas(640,480);
}


function draw(){

    background(135, 206, 235);
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrong();
    checkTongueFlyOverlap();
}

function moveFly(){

    fly.x += fly.speed;
    if (fly.x >width){
        fly.x =o;
        fly.y = random(200,400);      //random y location  of the fly 
    }
}

function drawFly(){
    fill(0);
    ellipse(fly.x, fly.y, fly.size);

}

function moveFrog(){
    frog.x = mouse.X;

}

function moveTongue(){
    tongue.x = frog.x;
    if (frog.tongue state==="outbound"){
        frog.tongue.y-= frog.tongue.speed;
        if(frog.tongue.y<=0>){
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


    
}