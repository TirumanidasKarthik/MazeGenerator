class Cell{
  constructor(x, y, w){
    this.x = x;
    this.y = y;
    this.w = w;
    this.top = true;
    this.right = true;
    this.botton = true;
    this.left = true;
    this.visited = false;
  }
  
  show(){
    stroke(255);
    if(this.top){
      line(this.x, this.y, this.x + this.w, this.y);
    }
    if(this.right){
      line(this.x + this.w, this.y, this.x + this.w, this.y + this.w);
    }
    if(this.bottom){
      line(this.x, this.y + this.w, this.x + this.w, this.y);
    }
    if(this.left){
      line(this.x, this.y, this.x, this.y + this.w);
    }
    if(this.visited){
      noStroke();
      fill("purple");
      rect(this.x, this.y, this.w, this.w);
    }
  }
}