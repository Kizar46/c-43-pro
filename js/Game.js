class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    b1 = createSprite(100,200);
    b1.addImage("b1",b1_img);
    b2= createSprite(300,200);
    b2.addImage("b2",b2_img);
    b3 = createSprite(500,200);
    b3.addImage("b3",b3_img);
    b4 = createSprite(700,200);
    b4.addImage("b4",b4_img);
    bikes = [b1, b2, b3, b4];
  }

  play(){
    form.hide();

    player.getPlayerInfo();
    

    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x =200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        bikes[index-1].x = x;
        bikes[index-1].y = y;
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name ,bikes[index-1].x,bikes[index-1].y+75);
        if (index === player.index){
         bikes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = bikes[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3770){
      gameState = 2;
    
    }
   console.log(player.rank);
   console.log(player.distance);
    drawSprites();
  }

  end(){
    console.log("Game Ended" + player.rank);

     
  }
}
