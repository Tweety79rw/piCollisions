class Block {
  constructor(x, y, w, v, m) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.v = v;
    this.m = m;
    this.lineY = this.y - this.w - 10;
  }
  HitWall() {
    return this.x < 0;
  }
  Reverse() {
    this.v *= -1;
  }
  Collide(other) {
    return !(this.x + this.w < other.x || this.x > other.x + other.w);
  }
  collision(other) {
    let sumM = this.m + other.m;
    let newV = (this.m - other.m)/sumM * this.v + 2*other.m/sumM*other.v;
    return newV;
  }
  Update() {
    this.x += this.v;
  }
  Render() {
    fill(255);
    rect(this.x, this.y - this.w, this.w, this.w);
    //stroke(0);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text('1e'+Math.log10(this.m), this.x + this.w/2, this.y - this.w/2);
    stroke(255);
    fill(255);

    if(this.v == 0) {
      line(this.x + this.w/2, this.y - this.w - 20,this.x + this.w/2,this.y - this.w - 5);
    } else {
      line(this.x, this.lineY,this.x + this.w, this.lineY);
      if(this.v < 0) {
        triangle(this.x, this.lineY, this.x + 5, this.y - this.w - 15, this.x + 5, this.y - this.w - 5);
      } else {
        triangle(this.x + this.w, this.y - this.w - 10, this.x + this.w - 5, this.y - this.w - 15, this.x + this.w - 5, this.y - this.w - 5);
      }
    }
  }
}
