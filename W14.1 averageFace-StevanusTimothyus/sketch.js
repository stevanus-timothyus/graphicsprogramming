var imgs = [];
var avgImg;
var numOfImages = 30;
var imgNum;
var ratX;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for(var i = 0; i<30; ++i){
        var filename ="assets/" + i + ".jpg";
        imgs.push(loadImage(filename));
    }

}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width*2, imgs[0].height);
    pixelDensity(1);
    
    avgImg = createGraphics(imgs[0].width, imgs[0].height)

    imgNum = round(random(0,imgs.length),0);
    ratX = map(mouseX,0,width,0,1,1);
    
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgs[imgNum],0,0);

    for(var i = 0; i<30; ++i){
        imgs[i].loadPixels();
    }
    avgImg.loadPixels();

    for(var pX = 0; pX < imgs[0].width ; ++pX){
        for(var pY = 0; pY < imgs[0].height ; ++pY){
            var pIndex = ((imgs[0].width * pY) + pX) * 4;
            avgImg.pixels[pIndex + 0] = 255;
            avgImg.pixels[pIndex + 1] = 0;
            avgImg.pixels[pIndex + 2] = 0;
            avgImg.pixels[pIndex + 3] = 255;
            var sumR = 0;
            var sumG = 0;
            var sumB = 0;
            
            for(var i = 0; i<imgs.length; ++i){
                sumR += imgs[i].pixels[pIndex + 0];
                sumG += imgs[i].pixels[pIndex + 1];
                sumB += imgs[i].pixels[pIndex + 2];
            }
            avgImg.pixels[pIndex + 0] = lerp(imgs[imgNum].pixels[pIndex + 0],sumR/imgs.length,ratX);
            avgImg.pixels[pIndex + 1] = lerp(imgs[imgNum].pixels[pIndex + 0],sumG/imgs.length,ratX);
            avgImg.pixels[pIndex + 2] = lerp(imgs[imgNum].pixels[pIndex + 0],sumB/imgs.length,ratX);
        }
    }
    avgImg.updatePixels();
    image(avgImg,imgs[0].width,0);
    noLoop();
}

function keyPressed(){
    imgNum = round(random(0,imgs.length),0);
    loop();
}

function mouseMoved(){
    ratX = map(mouseX,0,width,0,1,1);
    loop();
}