let block1;
let block2;
let count = 0;
let digits = 3;
let unit = 50;
let timeStep = Math.pow(10,digits-2);
function setup() {
  createCanvas(1900, 600);

  let digitsInput = createInput(digits, 'number');
  digitsInput.parent(createDiv('Digits of PI: '));
  digitsInput.input(function() {
    digits = +this.value();
    timeStep = Math.pow(10,digits-2);
    reset();
  });
  reset();
}
function reset() {
  count = 0;
  block1 = new Block(1000, 500, unit, 0, 1);
  block2 = new Block(1500, 500, unit* digits , -2/timeStep, pow(100, digits - 1));
}
function draw() {
  background(0);
  line(0, 500, width, 500);
  for(let i = 0; i < timeStep; i++) {
    if(block1.Collide(block2)) {
      let v1 = block1.collision(block2);
      let v2 = block2.collision(block1);
      block1.v = v1;
      block2.v = v2;
      count++;
    }
    if(block1.HitWall()) {
      block1.Reverse();
      count++;
    }
    block1.Update();
    block2.Update();
    if(block2.x < block1.w) {
      block2.x = block1.w;
    }
    if(block1.x < -1) {
      block1.x = -1;
    }
    if(block1.x + block1.w > block2.x) {
      block1.x = block2.x - block1.w;
    }
    if(block1.x > width-width/4) {
      translate(-block1.v, 0);
      block1.x = block1.x-block1.v;
      block2.x = block2.x -block1.v;
   }
  }

  block1.Render();
  block2.Render();

  text(count, width - 100, 50);
}
