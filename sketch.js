let clock;
let myFont;
let tickSound;

let prevS =0, currentS = 0;

function preload(){
  myFont = loadFont("assets/Pangolin-Regular.ttf")
  tickSound = loadSound("assets/clockTick.mp3")
  tickSound.setVolume(1)
}

function setup() {
  createCanvas(400, 400);
  
  
}

function draw() {
  background(255);
  clock = new Clock()
  clock.show()
  
  
  let r = 130;
  for(let i=1;i<=12;i++){
    let angle = map(i, 1, 13, PI/6, 2*PI + PI/6);
    let x = width/2 + r*sin(angle)
    let y = height/2 + 7 - r*cos(angle)
    fill(0)
    textSize(30)
    noStroke()
    textFont(myFont)
    textAlign(CENTER)
    text(i , x,y)
  }
  currentS = clock.seconds;
  if(changed(prevS, clock.seconds)){
    tickSound.play()
    prevS = currentS
  }
}

class Clock{
  constructor(){
    this.radius = 150;
    this.date = new Date()
    this.hhlength = 0.4*this.radius
    this.shlength = 0.9*this.radius
    this.mhlength = 0.8*this.radius
    this.hours = this.date.getHours()
    this.minutes = this.date.getMinutes()
    this.seconds = this.date.getSeconds()
    this.o = createVector(width/2, height/2);
    this.secAngle = map(this.seconds, 0, 60, 0, 2*PI)
    this.minAngle = map(this.minutes, 0, 60, 0, 2*PI)
    this.hourAngle = map(this.hours, 0, 12, 0, 2*PI)
    this.hourAngle += map(this.minutes, 0, 60, 0, PI/6)
    this.sec = createVector(this.o.x + this.shlength*sin(this.secAngle), this.o.y - this.shlength*cos(this.secAngle))
    this.min = createVector(this.o.x + this.mhlength*sin(this.minAngle), this.o.y - this.mhlength*cos(this.minAngle))
    this.hour = createVector(this.o.x + this.hhlength*sin(this.hourAngle), this.o.y - this.hhlength*cos(this.hourAngle))
  }
  
  show(){
    fill("black")
    textAlign(CENTER)
    textFont(myFont)
    textSize(16)
    text("Gourav Clocks", width/2, height/2 - this.radius/2.3)
    circle(this.o.x, this.o.y, 10)
    stroke("red")
    strokeWeight(5)
    noFill()
    line(this.o.x, this.o.y, this.min.x, this.min.y)
    strokeWeight(8)
    line(this.o.x, this.o.y, this.hour.x, this.hour.y)
    strokeWeight(2)
    line(this.o.x, this.o.y, this.sec.x, this.sec.y)
    circle(this.o.x, this.o.y, 2*this.radius)
    strokeWeight(1)
    circle(this.o.x, this.o.y, 1.4*this.radius)
    strokeWeight(20)
    stroke("orangered")
    circle(this.o.x, this.o.y, 2*this.radius + 28)

  }

}

function changed(a,b){
  return a!=b;
}


function mousePressed(){
  tickSound.play()
}