// cos and sin using Polar Coordinates to determine direction of explosions
// compare with cartesian explosion
// add "fill(0, 0, 0, 60); rect(0, 0, 400, 400);" and see

angleMode = "degrees";

class explosionObj {
  constructor(a) {
    this.position = new p5.Vector(0, 0);
    this.direction = new p5.Vector(0, 0);
    this.size = random(1, 3);
    if (a === 0) {
      this.c1 = random(0, 250);
    }
    else {
      this.c1 = random(100, 255);
    }
    if (a === 1) {
      this.c2 = random(0, 250);
    }
    else {
      this.c2 = random(100, 255);
    }
    if (a === 3) {
      this.c3 = random(0, 250);
    }
    else {
      this.c3 = random(100, 255);
    }
    this.timer = 0;
  }

  //// EXPERIMENT direction of explosion /////
  draw() {
    fill(this.c1, this.c2, this.c3, this.timer);        // 4th value fader
    noStroke();
    ellipse(this.position.x, this.position.y, this.size, this.size);

    // this.position.x += this.direction.y*cos(this.direction.x);
    // this.position.y += this.direction.y*sin(this.direction.x);
    this.position.add(this.direction); // random cartesian direction
    this.position.y += (90 / (this.timer + 100));    //gravity
    this.timer--;
  }
}

///// EXPERIMENT number of particles ////
class fireworkObj {
  constructor(a) {
    this.position = new p5.Vector(200, 380);
    this.direction = new p5.Vector(0, 0);
    this.target = new p5.Vector(mouseX, mouseY);
    this.step = 0;
    this.explosions = [];
    for (var i = 0; i < 200; i++) {
      this.explosions.push(new explosionObj(a));
    }
  }

  //// EXPERIMENT direction of explosion /////
  draw() {
    fill(255, 255, 255);
    noStroke();
    ellipse(this.position.x, this.position.y, 2, 2);

    this.position.add(this.direction);
    if (dist(this.position.x, this.position.y, this.target.x, this.target.y) < 4) {
      this.step = 2;
      for (var i = 0; i < this.explosions.length; i++) {
        this.explosions[i].position.set(this.target.x, this.target.y);

        // this.explosions[i].direction.set(random(0, 360), random(-0.3, 0.3));

        this.explosions[i].direction.set(random(-1, 1), random(-1, 1)).setMag(random(0, 0.3))

        this.explosions[i].timer = 180;
      }
    }
  }
}  // fireworkObj

var firework;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  firework = [new fireworkObj(0), new fireworkObj(1), new fireworkObj(2), new fireworkObj(0)];
}

function draw() {
  //background(0, 0, 0);  // erase the entire canvas
  fill(0, 0, 0, 60);  // don't erase the entire screen
  rect(0, 0, 400, 400);

  for (var j = 0; j < firework.length; j++) {
    if (firework[j].step === 0) {
      firework[j].position.set(200, 450);
      firework[j].target.set(random(100, 300), random(50, 120));
      firework[j].direction.set(firework[j].target.x - firework[j].position.x, firework[j].target.y - firework[j].position.y);
      var s = random(1, 2) / 100;
      firework[j].direction.mult(s);
      firework[j].step++;
    }
    else if (firework[j].step === 1) {
      firework[j].draw();
    }
    else if (firework[j].step === 2) {
      for (var i = 0; i < firework[j].explosions.length; i++) {
        firework[j].explosions[i].draw();
      }
      if (firework[j].explosions[0].timer <= 0) {
        firework[j].step = 0;
      }
    }
  }
}
