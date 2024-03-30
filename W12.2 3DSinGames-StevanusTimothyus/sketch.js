
var confLocs = [];
var confTheta = [];
var slider;
var cR;
var cG;
var cB;

function setup() {
    createCanvas(900, 800, WEBGL);
  
    for(var i = 0;i<200;i++){
        confLocs.push([random(-500,500), random(-800,0),random(-500,500)]);
        confTheta.push(random(0,360));
    };
    
    push();
    textSize(500);
    fill(0, 102, 153);
    stroke(10);
    textFont('Georgia');
    text('height of cubes', 100, 200);
    pop();
    
    
    slider = createSlider(0, 3, 1, 0.1);
    slider.position(50, 750);

    cR = random(0,255);
    cG = random(0,255);
    cB = random(0,255);
}

function draw() {
    background(125);
    angleMode(DEGREES);
    var sliderVal = slider.value();
    if (frameCount%50 == 0){
        cR = random(0,255);
        cG = random(0,255);
        cB = random(0,255);
    }

    for(var i=-400; i<=400 ; i+=50 ){
        for(var j=-400; j<=400 ; j+=50 ){
            var distance = dist(0,0,i,j);
            //Slider used to modify height of cubes
            var boxLength = 200 + sin(distance+frameCount)*100*sliderVal;
            push();
            var mat = round(random(1,3));
            if(i+j<-800+266 || i+j>800-266 || i-j<-800+266 || i-j>800-266){
                pointLight(cR,cG,cB,cos(frameCount/5)*800,-600,sin(frameCount/5)*800);
                specularMaterial(255);
                
            }
            else if(i+j<-800+532 || i+j>800-532 ||
                i-j<-800+532 || i-j>800-532){
                ambientLight(cR,cG,cB);
                ambientMaterial(255);
            }
            else{
                normalMaterial();
            }
            
            
            translate(i,0,j);
            box(50,boxLength,50);
            pop();
        }
    };
    confetti();
    camera(cos(frameCount/5)*800,-600,sin(frameCount/5)*800,0,0,0,0,1,0);
    perspective(80);
    
    stroke(0);
    strokeWeight(2);

    
}

function confetti(){
    for(var i = 0;i<200;i++){
        push();
        normalMaterial();
        noStroke();
        translate(confLocs[i][0],confLocs[i][1],confLocs[i][2]);
        rotate(confTheta[i],[1,1,1]);
        plane(15,15);
        pop();
        if(confLocs[i][1]>0){
            confLocs[i][1] = -800;
        }
        else{confLocs[i][1]+=1;}
        confTheta[i]+=10;
    };

}
