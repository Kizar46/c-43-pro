var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var bikes, b1, b2, b3, b4;
var track, b1_img, b2_img, b3_img, b4_img;

function preload(){
  track = loadImage("../images/track.jpg");
  b1_img = loadImage("../images/b1.png");
  b2_img = loadImage("../images/b2.png");
  b3_img = loadImage("../images/b3.png");
  b4_img = loadImage("../images/b4.png");
  ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
