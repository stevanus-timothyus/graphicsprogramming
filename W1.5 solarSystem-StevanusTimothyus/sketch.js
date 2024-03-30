var speed;

function setup() {
    createCanvas(900, 700);
}

function draw() {
    background(0);
    speed = frameCount;

    push();
    translate(width/2, height/2);
    push();//isolate the rotation of sun about itself
    rotate(radians(speed/3))
    celestialObj(color(255,150,0), 200); // SUN
    pop();
    rotate(radians(speed)); //Rotate about the SUN
    
    translate(300,0);
    push(); //isolate the rotation of earth about itself
    rotate(radians(speed)); //Rotate about the new translated canvas origin
    celestialObj(color("blue"),80); //Earth
    pop();
    rotate(radians(-speed*2)); //Rotation about the same point as the earth to ensure only one side of moon always faces the earth

    translate(100,0);
    celestialObj(color("white"),30); //Moon

    //First suggested idea for further development
    push();//isolate rotation of grey asteroid
    rotate(radians(-speed*2)) //Rotation about the same point as moon to make asteroid orbit around the moon.
    translate(25,0);
    rotate(radians(speed*8)); //personal addition of asteroid rotating about itself, due to being very close to the moon, causing fast rotation about the moon, this further lead to its fast rotation about itself.
    celestialObj(color("grey"),20); //Grey Asteroid
    pop();

    //Tweaked-Second suggested idea for further development (2 asteroids instead of 2 moons)
    push();
    rotate(radians(speed*2)); //opposite rotation
    translate(40,0); //Different distance
    rotate(radians(speed*2)); //Different speed
    celestialObj(color("green"),20); //Green Asteroid
    pop();

    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
