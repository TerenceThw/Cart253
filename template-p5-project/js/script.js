/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can move a circle
 * on the canvas using their own circle to "lead" it around.
 */

const target={
x: 100,
y: 200,
size: 100,
fill: "#cc0033"

}

const puck = {
    x: 350,
    y: 350,
    size: 100,
    fill: "#ff0000"
  };
  
  const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000"
  };
  
  /**
   * Create the canvas
   */
  function setup() {
    createCanvas(400, 400);
  }
  
  /**
   * Move the user circle, check for overlap, draw the two circles
   */
  function draw() {
    background("#aaaaaa");
    
    // Move user circle
    moveUser();
    
    // Draw the user and puck
    drawUser();
    drawPuck();
    moveTarget();
    drawtarget();
  }
  
  /**
   * Sets the user position to the mouse position
   */
  function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
  }
  
  /**
   * Displays the user circle
   */
  function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
  }
  
  /**
   * Displays the puck circle
   */
  function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);
    pop();
  }

  function moveTarget(){

    const distance = dist(user.x, user.y, puck.x, puck.y);
    const userIsOverLap = (distance< puck.size/2);

        if(userIsOverLap){
            //calculate the distance in between the user and the puck
            const distancex = dist(user.x-puck.x);
            const distancey = dist(user.y-puck.y);

            //check which one is closer
            if(distancex<distancey) {

                if(user.x<puck.x){    
                puck.x+=1; //move to the right
            }
                else{

                puck.x-=1; //move to the left
                }
        } else{
            if (user.y < puck.y){
                puck.y +=1;    //move down
            }
            else{
                puck.y-=1;   //move up
 
            }
        }
        }
    }

    function drawtarget(){
        push();
        noStroke();
        fill(target.fill);
        ellipse(target.x,target.y,target.size);
        pop();



    }
    









