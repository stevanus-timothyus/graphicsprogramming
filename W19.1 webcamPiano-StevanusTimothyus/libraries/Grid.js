
//Implement a custom "Note" class.
class Note {
  constructor(_x,_y,_size,_state=0){
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.state = _state;
  }
  //////////////////
  onState(){
    this.state = 1;
  }
  drawNote(i,totalNotes){
    var alpha = this.state * 200;
    var c1 = color(255,0,0,alpha);
    var c2 = color(0,255,0,alpha);
    var mix = lerpColor(c1, c2, map(i, 0, totalNotes, 0, 1));
    fill(mix);
    var s = this.size*this.state;
    //Customize graphics to change shape over time
    if(this.state>0.5){
      ellipse(this.x, this.y, s, s);
    }
    else if(this.state>0){
      rect(this.x-s/2,this.y-s/2,s,s);
    }
    this.state-=0.05;
    this.state=constrain(this.state,0,1); 
  }
}
class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.gridSize = 40;
    this.notes = [];

    // initalise grid structure and state
    for (var x=0;x<_w;x+=this.gridSize){
      var noteColumn = [];
      for (var y=0;y<_h;y+=this.gridSize){
        noteColumn.push(new Note(x+this.gridSize/2,y+this.gridSize/2,this.gridSize));
      }
      this.notes.push(noteColumn);
    }
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img);
  }
  /////////////////////////////////
  drawActiveNotes(img){
    // draw active notes
    fill(255);
    noStroke();
    for (var i=0;i<this.notes.length;i++){
      for (var j=0;j<this.notes[i].length;j++){
        this.notes[i][j].drawNote(i,this.notes.length);
      }
    }
  }
  /////////////////////////////////
  findActiveNotes(img){
    for (var x = 0; x < img.width; x += 1) {
        for (var y = 0; y < img.height; y += 1) {
            var index = (x + (y * img.width)) * 4;
            var state = img.pixels[index + 0];
            if (state==0){ // if pixel is black (ie there is movement)
              // find which note to activate
              var screenX = map(x, 0, img.width, 0, this.gridWidth);
              var screenY = map(y, 0, img.height, 0, this.gridHeight);
              var i = int(screenX/this.gridSize);
              var j = int(screenY/this.gridSize);
              this.notes[i][j].onState();
            }
        }
    }
  }
}