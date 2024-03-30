////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(102,51,0);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150,480,200,15, {
    isStatic: true, angle: angle
  });
  World.add(engine.world, propeller);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  Body.setAngle(propeller,angle)
  Body.setAngularVelocity(propeller,angleSpeed)
  angle += angleSpeed;
  fill(20,160,182);
  drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var R = random(0,1)
  if (R>0.66){
    var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
    restitution: 0.95 });
  }
  else if(R>0.33){
    var bird = Bodies.polygon(mouseX, mouseY, 6, 20, {friction: 0,
    restitution: 0.95 });
  }
  else{
    var bird = Bodies.trapezoid(mouseX, mouseY, 40, 40, 2, {friction: 0,
    restitution: 0.95 });
  }
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birdsCol.push(fillR())
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //your code here
  for(var i=0; i < birds.length; i++){
    if(isOffScreen(birds[i])){
      removeFromWorld(birds[i]);
      birds.splice(i,1);
      birdsCol.splice(i,1);
      i--;
    }
    else {
      push();
      fill(birdsCol[i]);
      drawVertices(birds[i].vertices);
      pop();
    }
    
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  for(var i=0; i<6; i++){
    for(var j=0; j<3; j++){
      var box = Bodies.rectangle(720+j*80,520-i*80,80,80);
      boxes.push(box);
      colors.push(random(50,255)); //min 50 so it doesnt go too dark
    }
  }
  World.add(engine.world, boxes);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for(var i=0; i<boxes.length; i++){
    if(isOffScreen(boxes[i])){
      removeFromWorld(boxes[i]);
      boxes.splice(i,1);
      colors.splice(i,1);
      i--;
    }
    else {
      push();
      fill(0,colors[i],0);
      drawVertices(boxes[i].vertices);
      pop();
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//your code here
  slingshotBird = Bodies.circle(180,200,30,{
    friction:0,
    restitution:0.95
  });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  slingshotConstraint = Constraint.create({
    pointA: {x:180, y:200},
    bodyB: slingshotBird,
    pointB: {x:0, y:0},
    stiffness:0.01,
    damping:0.0001
  });
  World.add(engine.world,[slingshotBird,slingshotConstraint])
}
/////////////////////////////r///////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  // your code here
  fill(fillR()); //Made it colourful to seem like a "Super" bird
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
