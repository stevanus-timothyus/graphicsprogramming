var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var asteroidScore;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);

  asteroidScore = 0;
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
  
  //Asteroid hit counter
  push();
  fill(255);
  textSize(30);
  textAlign(CENTER);
  text("Asteroid Hit: "+asteroidScore, 120, 50)
  

  //Increase difficulty by updating spawning rate of asteroids to a higher number as time passes
  asteroids.difficulty = 0.01 * (1+((frameCount/frameRate())/10))
  text("Difficulty: "+ parseFloat(asteroids.difficulty).toFixed(3), 120, 80)
  pop();
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(0,102,0);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions || asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var j=0;j<asteroids.locations.length;j++){
      if(this.isInside(spaceship.location,spaceship.size,asteroids.locations[j],asteroids.diams[j]))
      {this.gameOver();};
    };

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var j=0;j<asteroids.locations.length;j++){
      if(this.isInside(earthLoc,earthSize.x,asteroids.locations[j],asteroids.diams[j]))
      {this.gameOver();};
    };

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(this.isInside(earthLoc,earthSize.x,spaceship.location,spaceship.size)){
      this.gameOver();
    };

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(this.isInside(atmosphereLoc,atmosphereSize.x,spaceship.location,spaceship.size)){
      spaceship.setNearEarth();
    };

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for(var j=0;j<asteroids.locations.length;j++){
      for(var k=0;k<spaceship.bulletSys.bullets.length;k++){
        if(this.isInside(spaceship.bulletSys.bullets[k],spaceship.bulletSys.diam,asteroids.locations[j],asteroids.diams[j]))
        {
          asteroids.destroy(j);
          asteroidScore += 1;
        };
      };
    };

}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    if(p5.Vector.sub(locA,locB).mag()<(sizeA/2+sizeB/2)){
      return true;
    }
      return false;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
