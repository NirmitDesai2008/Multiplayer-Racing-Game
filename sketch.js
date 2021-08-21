var database;
var finished, finishedPlayers;
var playerCount, allPlayers;
var obstacle, obstaclesGroup;
var form, player, game;
var cars, car1, car2, car3, car4;
var i, trackImage, car1Image, car2Image, car3Image, car4Image;
var goldMedalImage, silverMedalImage, bronzeMedalImage;
var slidingSound;
var distance = 0;
var gameState = 0;

function preload(){
  obstaclesImage = loadImage("images/obstacle.png");
  slidingSound = loadSound("sounds/sliding.mp3");
  trackImage = loadImage("images/track.jpg");
  car1Image = loadImage("images/car1.png");
  car2Image = loadImage("images/car2.png");
  car3Image = loadImage("images/car3.png");
  car4Image = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  goldMedalImage = loadImage("images/gold.png");
  silverMedalImage = loadImage("images/silver.png");
  bronzeMedalImage = loadImage("images/bronze.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight);
  database = firebase.database();

  gameState = 0;
  distance = 0;
  finishedPlayers = 0;
  yVel = 0;
  xVel = 0;
  obstaclesGroup = createGroup();

  xSet = false;
  game = new Game();
  game.getState();
  game.start();

  for (i=0; i<5; i++){
    w = random(200,950);
    h = random(-height*4, height-300);
    obstacle = createSprite(w,h);
    obstacle.addImage("obstacle",obstaclesImage);
    obstaclesGroup.add(obstacle);
  }
}

function draw(){
  background(200,200,255);

  if (playerCount === 4 && finishedPlayers === 0){
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (finishedPlayers === 4){
    game.update(2);
  }

  if (gameState === 2 && finishedPlayers === 4){
    game.displayRanks();
  }
}