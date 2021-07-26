var cloudGroup,cactusGroup
var jumpSound,dieSound,checkpointSound
var edges,invisible_ground;
var trex ,trex_running;
var ground,ground_image;
var cloud,cloud_image
var cactus1_image
var cactus2_image
var cactus3_image
var cactus4_image
var cactus5_image
var cactus6_image
var trex_collided
var gameState = 1//when value = 1 means in play state
var score = 0
var highscore = 0
var gameOver_Image
var restart_Image
var gameOver,restart
function preload(){
  trex_collided=loadAnimation("trex_collided.png")
  trex_running = loadAnimation("trex1.png", "trex3.png",             "trex4.png");  
  ground_image=loadImage("ground2.png")
  gameOver_Image=loadImage("gameOver.png")
  restart_Image=loadImage("restart.png")
  cloud_image=loadImage("cloud.png")
  cactus1_image=loadImage("obstacle1.png")
  cactus2_image=loadImage("obstacle2.png")
  cactus3_image=loadImage("obstacle3.png")
  cactus4_image=loadImage("obstacle4.png")
  cactus5_image=loadImage("obstacle5.png")
  cactus6_image=loadImage("obstacle6.png")
  jumpSound=loadSound("jump.mp3")
  checkpointSound=loadSound("checkPoint.mp3")
  dieSound=loadSound("die.mp3")
  
}

function setup(){
  createCanvas(600,200)
  edges=createEdgeSprites()
  invisible_ground = createSprite(300,190,600,30)
  invisible_ground.visible = false

  
  cactusGroup = createGroup()
  cloudGroup = createGroup()
  
  //create a trex sprite 
  trex = createSprite(50,160,20,50);
  gameOver = createSprite(300,100)
  restart = createSprite(300,130)
  gameOver.scale=0.5
  restart.scale=0.5
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide", trex_collided)
  gameOver.addImage(gameOver_Image)
  restart.addImage(restart_Image)
  trex.scale = 0.5
  //trex.debug=true
  //trex.setCollider("rectangle", 0,0, 120,70)
  trex.setCollider("circle", 0,0 , 40)
  ground = createSprite(300,170,600,30)
  ground.addImage(ground_image)
}

function draw(){
  background("white");
  drawSprites();
  text("Score : " + score, 500,50)
  text("High Score:" + highscore , 30,50)
  console.log(ground.velocityX)
  if(gameState === 1){
    

    createClouds();
    createCactus();
    gameOver.visible=false
    restart.visible=false
    console.log(trex.y)
    ground.velocityX = -(3+score/100)
    if(ground.x < 0){
      ground.x=300
    }
    
    if(score%150===0 && score>0){
      checkpointSound.play()
      //console.log(score)
    }
    
   
   
  //if(keyDown("SPACE") && trex.isTouching(ground)){
    if(keyDown("SPACE") && trex.y > 154){
      trex.velocityY = -17
      jumpSound.play()
    }
    score=score+Math.round(getFrameRate()/40)
    
    trex.velocityY = trex.velocityY + 1
    if(trex.isTouching(cactusGroup)){
     gameState = 0
     dieSound.play()
      //jumpSound.play()
      //trex.velocityY= -17
    }
    

  }
  else if(gameState === 0){
    ground.velocityX=0
    trex.velocityY=0
    cactusGroup.setVelocityXEach(0)
    cloudGroup.setVelocityXEach(0)
    cactusGroup.setLifetimeEach(-1)
    cloudGroup.setLifetimeEach(-1)
    trex.changeAnimation("collide",trex_collided)
    gameOver.visible=true
    restart.visible=true
    
    if(mousePressedOver(restart)){
        reset();
    }
  }
  
  //console.log(trex.y)
  //console.warn("Hi")
  //console.error("Hi")
  //console.info("Hi")
  //console.log(frameCount) 
  /*trex.collide(edges[3]*/
  /*trex.collide(ground)*/
  trex.collide(invisible_ground)

  
  
  
}
  
  function createClouds(){
    if(frameCount % 80 ===0){
      cloud = createSprite(615,20,50,20);
      cloud.lifetime=(205)
      cloud.y=Math.round(random(10,111))
      cloudGroup.add(cloud)
      //console.log(cloud.y)
      //console.log(trex.depth)
      //console.log(cloud.depth)
      cloud.addImage(cloud_image)
      cloud.velocityX = -3
      cloud.depth = trex.depth
      trex.depth = trex.depth + 1

    }
  }
  function createCactus(){
    if(frameCount % 70 ===0){
      cactus1 = createSprite(610,160,10,40)
      cactus1.lifetime=(203)//610/3
      cactus1.velocityX=-3
      cactus1.scale=0.35
      var choice = Math.round(random(1,6))
      cactusGroup.add(cactus1)
      switch(choice){
        case 1:  cactus1.addImage(cactus1_image);break
        case 2:  cactus1.addImage(cactus2_image);break
        case 3:  cactus1.addImage(cactus3_image);break
        case 4:  cactus1.addImage(cactus4_image);break
        case 5:  cactus1.addImage(cactus5_image);break
        case 6:  cactus1.addImage(cactus6_image);break
      }
    }
  }
    
    
    function reset(){
      gameState = 1  
      cactusGroup.destroyEach()
      cloudGroup.destroyEach()
      trex.changeAnimation("running",trex_running)
      if(score > highscore){
        highscore = score
      }
      score = 0
    }