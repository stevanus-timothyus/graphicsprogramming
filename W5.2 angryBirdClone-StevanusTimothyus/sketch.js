// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;

var gameCD=60;//for Make it a game
birdsCol = [];//Random 'birds'

////////////////////////////////////////////////////////////
function setup() {
  frameRate(72);//for Make it a game

  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
}
////////////////////////////////////////////////////////////
function draw() {
  background(0);

  Engine.update(engine);

  drawGround();

  drawPropeller();

  drawTower();

  drawBirds();

  drawSlingshot();
  
  game();//for Make it a game
}
////////////////////////////////////////////////////////////
/////Ideas for further development  
//Make it a game
function game(){
  gameCD = 60 - min(round(frameCount/72,0),60)
  push(); //Countdown text
  fill(255);
  text("Time Left: " + gameCD + "s",50,50);
  pop();
  if(boxes.length == 0){
    push();
    fill(0,255,0);
    textAlign(CENTER);
    textSize(30);
    text("You WON!",width/2,height/2);
    pop();
    noLoop();
  }
  else if(gameCD == 0){
    push();
    fill(255,0,0);
    textAlign(CENTER);
    textSize(30);
    text("You LOST!",width/2,height/2);
    pop();
    noLoop();
  };
};
//Random colour helper
function fillR(rR=255,gR=255,bR=255,rC=1,gC=1,bC=1){ //fill random colour if the corresponding colourC is 1.
  var r,g,b
  if(rC==1){
    r = random(0,rR);
  }
  else{
    r = rR;
  };
  if(gC==1){
    g = random(0,gR);
  }
  else{
    g = gR;
  };
  if(bC==1){
    b = random(0,bR);
  }
  else{
    b = bR;
  };
  return [r,g,b]
}


////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    //your code here
    angleSpeed -= 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    //your code here
    angleSpeed += 0.01;
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
