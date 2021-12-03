//add sounds
//fix Buper,sky appearing after restarting
//y collide with ground not working

var skyImage,sky;
var invisibleGround1,invisibleGround2,invisibleGround3,invisibleGround4;
var Buper,BuperAnimation,Buperjumping;
var PLAY=1;
var END=0
var gameState=PLAY
var reset, resetImage;
var score=0
var heart1,heart2,heart3,heartImage;
var birdAnimation;
var array1;
var reset,resetImage;
var numberoflives=3
var gameOver,gameOverImage;

localStorage["HighestScore"] = 0;

function preload() {
  skyImage = loadImage("sky.png");
  building1Image=loadImage("building.png")
  building2Image=loadImage("building2.png")
  building3Image=loadImage("building3.png")
  building4Image=loadImage("building4.png")
  building5Image=loadImage("building5.png")
  BuperAnimation=loadAnimation("buper1.png","buper2.png","buper3.png")
  Buperjumping=loadImage("buper4.png")
  resetImage=loadImage("reset.jpg")
  kiteImage=loadImage("kite.png")
  heartImage=loadImage("heart.png")
  birdAnimation=loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png")
  gameOverImage=loadImage("Game Over.JPG")
  }

function setup() {
  createCanvas(1000,800);

  sky = createSprite(500,400,1000,800);
  sky.addImage(skyImage);
  sky.scale=1.3;
  sky.velocityX = -(6 + 3*score/100);
  
  invisibleGround1=createSprite(500,800,1000,10)
  invisibleGround1.visible=false;
  invisibleGround2=createSprite(500,0,1000,10)
  invisibleGround2.visible=false;
  invisibleGround3=createSprite(0,400,10,800)
  invisibleGround3.visible=false;
  invisibleGround4=createSprite(1000,400,10,800)
  invisibleGround4.visible=false;
  
  Buper=createSprite(300,300,20,20)
  Buper.addAnimation("running",BuperAnimation)
  Buper.scale=0.5

  gameOver=createSprite(width/2,height/2)
  gameOver.addImage(gameOverImage)

  reset=createSprite(width/2,height/2+250,40,40)
  reset.addImage(resetImage)
  reset.scale=0.2
  
  score=0;

  buildingGroup=createGroup();
  kiteGroup=createGroup();
  obstaclesGroup=createGroup()
  }

function draw() {
  background(255);
  drawSprites();

  if (sky.x < 10){
  sky.x = sky.width/4;
  }
  
if(gameState===PLAY){
  gameOver.visible=false;
  reset.visible=false;
  textSize(30)
  fill("red")
  text("Score:"+score,800,50)
  text("Number of lives left: "+numberoflives,700,100)
  text("Highest score: "+localStorage["HighestScore"],700,150)

  fill("pink")
  textSize(20)
  text("Use the space and right key to move Buper.",10,30)
  text("Everytime you touch an obstacle you lose a life",10,50)
  text("If Buper moves out of the screen, the game ends!",10,70)
  text("The longer you walk on the buildings, the more points you get!",10,90)


  fill("purple")
  textSize(50)
  text("BUPER",width/2-50,50)

  
if(keyDown("space")) {
  Buper.addImage(Buperjumping)
  Buper.velocityY = -13;
  }
  Buper.velocityY = Buper.velocityY + 0.8
  
  if(keyDown("right")){
  Buper.x=Buper.x+10
  }
  
  score = score + Math.round(getFrameRate()/60);
  
  Buper.collide(invisibleGround1);
  Buper.collide(invisibleGround2);
  Buper.collide(invisibleGround3);
  Buper.collide(invisibleGround4);
  Buper.collide(buildingGroup);
  
  if(Buper.collide(obstaclesGroup) || Buper.collide(invisibleGround1)){
  numberoflives=numberoflives-1
  }

  if(Buper.isTouching(buildingGroup)){
  score=score+10
  }

  if(numberoflives<=0){
  gameState=END
  }

  if(Buper.x<0){
  gameState=0
  }
  
  spawnObstacles();
  spawnbuildings();
  }

else if(gameState===END){
  sky.destroy();
  buildingGroup.destroyEach();
  Buper.destroy();
  obstaclesGroup.destroyEach();
  gameOver.visible=true;
  reset.visible=true;
}

if(mousePressedOver(reset)) {
  restart();
  }
  }

function spawnObstacles(){
  if(frameCount%100===0){
  var obstacles=createSprite(1000,100,100,100);
  obstacles.velocityX=-10
  obstacles.velocityY=1
  var rand = Math.round(random(1,2));
  switch(rand){
  case 1: obstacles.addAnimation("obstacle1",birdAnimation)
  obstacles.setCollider("rectangle",0,0,100,100)
  break;
  case 2: obstacles.addImage(kiteImage)
  obstacles.setCollider("rectangle",0,0,200,200)
  obstacles.scale=0.7
  break;
  default: break;
  }
  Buper.depth=obstacles.depth+1;
  obstaclesGroup.add(obstacles);
  }
  }
function spawnbuildings() {
  if(frameCount % 100 === 0) {
  var building= createSprite(1000,Math.round(random(700,850)),100,200);
  building.velocityX = -20;
  var rand = Math.round(random(1,5));
  switch(rand) {
  case 1: building.addImage(building1Image);
  building.scale=1.4;
  building.setCollider("rectangle",0,0,150,230)
  break;
  case 2: building.addImage(building2Image);
  building.scale=1.6
  building.setCollider("rectangle",0,0,160,235)
  break;
  case 3: building.addImage(building3Image);
  building.scale=2.5
  building.setCollider("rectangle",10,0,130,200)
  break;
  case 4: building.addImage(building4Image);
  building.scale=0.9
  building.setCollider("rectangle",0,0,280,400)
  break;
  case 5: building.addImage(building5Image);
  building.scale=2.7;
  building.setCollider("rectangle",0,20,145,260)
  break;
  default: break;
  }
  building.lifetime = 1000;
  buildingGroup.add(building)
  Buper.depth=building.depth+1
  }
  }

function restart(){
  gameState = PLAY;

  sky = createSprite(500,400,1000,800);
  sky.addImage(skyImage);
  sky.scale=1.3;
  sky.velocityX = -(6 + 3*score/100);
  
  invisibleGround1=createSprite(500,800,1000,10)
  invisibleGround1.visible=false;
  invisibleGround2=createSprite(500,0,1000,10)
  invisibleGround2.visible=false;
  invisibleGround3=createSprite(0,400,10,800)
  invisibleGround3.visible=false;
  invisibleGround4=createSprite(1000,400,10,800)
  invisibleGround4.visible=false;

  Buper=createSprite(300,300,20,20)
  Buper.addAnimation("running",BuperAnimation)
  Buper.scale=0.5

  reset.visible = false;
  gameOver.visible=false;
  
  obstaclesGroup.destroyEach();
  buildingGroup.destroyEach();
  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  numberoflives=3;
}