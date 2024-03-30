var stepSize = 20;
var sVal;
var ballX;
var ballY;
var ballVisual = true; //Press b to disable ball visual
var colourTemplate = 1; //Press c to change colourTemplate
var shapeType = 1; //Press s to change shapeType

function setup() {
  createCanvas(500, 500);
  noiseDetail(20);
  ballX = width/2
  ballY = height/2
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  //Update speed value as per mouseX's position
  //FOR compass’ movement speed & grid color change speed
  sVal = frameCount/map(mouseX,0,width,50,200);
  colorGrid();
  compassGrid();

  //Dictates the amount of c1 / c2 values with position of ball that can be modified with arrow keys
  colouring();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
  ///my own colors and style
  var c1,c2
  if (colourTemplate==1){
    c1 = color(map(ballX,0,width,0,255),0,0);
    c2 = color(0,map(ballY,0,height,0,255),0);
  }
  else if (colourTemplate==2){
    c1 = color(map(ballX,0,width,0,255),0,0);
    c2 = color(0,0,map(ballY,0,height,0,255));
  }
  else if (colourTemplate==3){
    c1 = color(0,map(ballX,0,width,0,255),0);
    c2 = color(0,0,map(ballY,0,height,0,255));
  }
  fill(255);
  stroke(0);
  for(var i=0;i<25;i++){
    for(var j=0;j<25;j++){
      var nVal = noise(i/30,j/30,sVal);
      var nCol = lerpColor(c1,c2,nVal); 
      noStroke();
      push();
      fill(nCol);
      rect(i*stepSize,j*stepSize,stepSize,stepSize);
      pop();
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  fill(0);
  // your code here
  for(var i=0;i<25;i++){
    for(var j=0;j<25;j++){
      ///my own colors and style
      var c,cN
      cN = map(noise(frameCount/30),0,1,0,255) //noise changes compass colour
      if (colourTemplate==1){
        c = color(cN,100,200);
      }
      else if (colourTemplate==2){
        c = color(100,200,cN);
      }
      else if (colourTemplate==3){
        c = color(200,cN,100);
      }

      var nVal = noise(i/30,j/30,sVal);
      var mVal = map(nVal,0,1,0,720);
      push();
      translate(i*stepSize+stepSize/2,j*stepSize+stepSize/2);
      rotate(radians(mVal));
      var lSize = map(noise(frameCount/30),0,1,0,30) //noise changes compass size
      stroke(c);
      if (shapeType==1){
        strokeWeight(2);
        line(0,0,0,-lSize);
      }
      else{
        fill(c);
        stroke(0);
        strokeWeight(1);
        var tSize = lSize/2
        beginShape();
        vertex(-tSize/3,tSize/2);
        vertex(0,-tSize);
        vertex(tSize/3,tSize/2);
        endShape();
      };
      
      pop();
    }
  }
}
function colouring(){
  ///my own colors and style
  if (keyIsDown(LEFT_ARROW)){
    ballX-=3;
  }
  if (keyIsDown(RIGHT_ARROW)){
    ballX+=3;
  }
  if (keyIsDown(UP_ARROW)){
    ballY-=3;
  }
  if (keyIsDown(DOWN_ARROW)){
    ballY+=3;
  }
  ballX = max(min(ballX,width),0);
  ballY = max(min(ballY,height),0);
  push();
  if(ballVisual){fill(random(0,255),random(0,255),random(0,255));}
  if(!ballVisual){noFill();}
  ellipse(ballX,ballY,5);
  pop();
}
function keyPressed(){
  if (key==='b'){
    ballVisual = !ballVisual;
  }
  if (key==='c'){
    colourTemplate+=1;
    if (colourTemplate==4){
      colourTemplate = 1;
    }
  }
  if (key==='s'){
    shapeType+=1;
    if (shapeType==3){
      shapeType = 1;
    }
  }
}