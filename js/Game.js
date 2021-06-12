class Game {
  constructor(){}

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

    car1 = createSprite(100,displayHeight/2)
    car2 = createSprite(300,displayHeight/2)
    car3 = createSprite(500,displayHeight/2)
    car4 = createSprite(700,displayHeight/2)

    cars = [car1,car2,car3,car4]
    console.log(cars)
  }

  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){

      //index for the car array
      var index = 0
       var x = 0;
       var y;
      for(var plr in allPlayers){
       index++;
      x = x+200;
      cars[index - 1].x  = x;
       y = displayHeight/2 - allPlayers[plr].distance;
       cars[index-1].y = y;
        if(index === player.index){
          cars[index-1].shapeColor = "blue"
          camera.position.x = displayWidth/2
          camera.position.y = cars[index - 1].y
        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=50
      player.update();
    }

    drawSprites()
  }
}
