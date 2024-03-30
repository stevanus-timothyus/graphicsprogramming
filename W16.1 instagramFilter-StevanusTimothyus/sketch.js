// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
    [1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
//horizontal edge detection / vertical lines
var matrixX = [    // in javascript format
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1]
];
//vertical edge detection / horizontal lines
var matrixY = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1]
];
//Store image that is filtered as per user request
var dispImg;
/////////////////////////////////////////////////////////////////
function preload() {
    imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
    createCanvas((imgIn.width * 2), imgIn.height+70);

    //Default filter is as per what the assignment requests
    dispImg = earlyBirdFilter(imgIn);
}
/////////////////////////////////////////////////////////////////
function draw() {
    background(125);
    image(imgIn, 0, 0);
    image(dispImg, imgIn.width, 0);
    text("Press \"o\" to see the main filter for this project. Click anywhere on the original image to apply radial blur filter around it.",20,imgIn.height+15)
    text("Press \"g\" to use the grayscale filter on the original image",20,imgIn.height+30)
    text("Press \"e\" to use the edge detection filter on the original image",20,imgIn.height+45);
    text("Press \"i\" to use the invert colour filter on the original image",20,imgIn.height+60);
    noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed(){
  //Only applies ability to click for radial blur when key has not been touched(ie when application just loaded) or when 'o' is pressed to show main filter for project.
  if(key == "" || key == "o"){
    dispImg = earlyBirdFilter(imgIn);
  }
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img){
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
  return resultImg;
}
/////////////////////////////////////////////////////////////////////
function sepiaFilter(img){
  imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var r =  img.pixels[index + 0];
          var g =  img.pixels[index + 1];
          var b =  img.pixels[index + 2];

          imgOut.pixels[index + 0] = r*0.393 + g*0.769 + b*0.189;
          imgOut.pixels[index + 1] = r*0.349 + g*0.686 + b*0.168;
          imgOut.pixels[index + 2] = r*0.272 + g*0.534 + b*0.131;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}
/////////////////////////////////////////////////////////////////////
function darkCorners(img){
  imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var r =  img.pixels[index + 0];
          var g =  img.pixels[index + 1];
          var b =  img.pixels[index + 2];

          var pDist = dist(x,y,img.width/2,img.height/2);
          var dynLum;
          
          if(pDist<=450){
            dynLum = map(pDist,300,450,1,0.4);
          }
          else{
            dynLum = map(pDist,450,dist(img.width/2,img.height/2,img.width,img.height),0.4,0);
          }

          imgOut.pixels[index + 0] = r*dynLum;
          imgOut.pixels[index + 1] = g*dynLum;
          imgOut.pixels[index + 2] = b*dynLum;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

/////////////////////////////////////////////////////////////////////
function radialBlurFilter(img){
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  for (var x=0;x<img.width;x++){
    for (var y=0;y<img.height;y++){
      var index = (y*img.width + x)*4;
      var c = convolution(x,y,matrix,matrixSize,img);
      var dynBlur = map(dist(x,y,mouseX,mouseY),100,300,0,1,1);

      imgOut.pixels[index + 0] = c[0]*dynBlur + img.pixels[index + 0]*(1-dynBlur);
      imgOut.pixels[index + 1] = c[1]*dynBlur + img.pixels[index + 1]*(1-dynBlur);
      imgOut.pixels[index + 2] = c[2]*dynBlur + img.pixels[index + 2]*(1-dynBlur);
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function convolution(x,y,matrix,matrixSize,img){
  var tR = 0;
  var tG = 0;
  var tB = 0;

  var offset = floor(matrixSize/2);

  for (var i = 0; i<matrixSize; i++){
    for (var j = 0; j<matrixSize; j++){
      var xloc = x + i - offset;
      var yloc = y + j - offset;

      var index = (img.width * yloc + xloc) * 4;

      index = constrain(index, 0, img.pixels.length-1);

      tR += img.pixels[index + 0] * matrix[i][j];
      tG += img.pixels[index + 1] * matrix[i][j];
      tB += img.pixels[index + 2] * matrix[i][j];
    }
  }
  return [tR,tG,tB]
}
/////////////////////////////////////////////////////////////////////
function borderFilter(img){
  var buffer = createGraphics(img.width,img.height);
  
  buffer.image(img,0,0);
  buffer.stroke(255);
  //Alternative to drawing another rectangle to cover the triangle edges, we can just increase strokeWeight :>>
  buffer.strokeWeight(40);
  buffer.fill(0,0,0,0);
  buffer.rect(0, 0, img.width, img.height, 40);

  return buffer;
}

/////////////////////////////////////////////////////////////////////
function greyscaleFilter(img){
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
      for (y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var r = img.pixels[index + 0];
          var g = img.pixels[index + 1];
          var b = img.pixels[index + 2];

          var gray = (r + g + b) / 3; // simple
          // var gray = r * 0.299 + g * 0.587 + b * 0.0114; // LUMA ratios

          imgOut.pixels[index+0]= imgOut.pixels[index+1] = imgOut.pixels[index+2] = gray;
          imgOut.pixels[index+3]= 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}
/////////////////////////////////////////////////////////////////////
function edgeDetectionFilter(img){
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrixX.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;
          var cX = convolution(x, y, matrixX, matrixSize, img);
          var cY = convolution(x, y, matrixY, matrixSize, img);

          cX = map(abs(cX[0]), 0, 1020, 0, 255);
          cY = map(abs(cY[0]), 0, 1020, 0, 255);
          var combo = cX + cY;

          imgOut.pixels[index + 0] = combo;
          imgOut.pixels[index + 1] = combo;
          imgOut.pixels[index + 2] = combo;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

/////////////////////////////////////////////////////////////////////
function invertFilter(img){
  imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
      for (var y = 0; y < imgOut.height; y++) {

          var index = (x + y * imgOut.width) * 4;

          var r = 255 - img.pixels[index + 0];
          var g = 255 - img.pixels[index + 1];
          var b = 255 - img.pixels[index + 2];

          imgOut.pixels[index + 0] = r;
          imgOut.pixels[index + 1] = g;
          imgOut.pixels[index + 2] = b;
          imgOut.pixels[index + 3] = 255;
      }
  }
  imgOut.updatePixels();
  return imgOut;
}

function keyPressed(){
  if(key == "o"){
    dispImg = earlyBirdFilter(imgIn);
  }
  if(key == "g"){
    dispImg = greyscaleFilter(imgIn);
  }
  if(key == "e"){
    dispImg = edgeDetectionFilter(imgIn);
  }
  if(key == "i"){
    dispImg = invertFilter(imgIn);
  }
  loop();
}