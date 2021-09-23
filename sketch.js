var backgroundImg, characterImg, enemy1Img, enemy2Img, gemImg, gameOverImg
var bg, character, gem, gameOver
var enemies
var gameState = 1

function preload() {
  backgroundImg = loadImage("assets/background.gif")
  characterImg = loadAnimation("cAnim/sprite_0.png","cAnim/sprite_1.png","cAnim/sprite_2.png","cAnim/sprite_3.png")
  circle = loadAnimation("assets/Circle.gif")
  enemy1Img = loadImage("assets/enemy1.gif")
  enemy2Img = loadImage("assets/enemy2.png")
  gemImg = loadImage("assets/gem.gif")
  gameOverImg = loadImage("assets/gameOver2.gif")
}

function setup() 
{
  createCanvas(600,600);
  
  enemies = new Group()

  bg = createSprite(width/2,height/2)
  bg.addImage(backgroundImg)
  bg.scale = 8

  character = createSprite(100,520)
  character.setCollider("rectangle",0,30,70,70)
  character.addAnimation("moving",characterImg)
  character.addAnimation("gameOver",circle)

  gameOver = createSprite(width/2,height/2)
  gameOver.addImage(gameOverImg)
  // gameOver.scale = 4
  gameOver.visible = false

}

function draw() 
{
  background(0)

  if (gameState == 1) {

    character.x = World.mouseX
    
    spawnEnemies()

    if (enemies.collide(character)) {
      enemies[0].destroy()
      enemies.destroyEach()
      gameState = 2
    }
  }
  else {
    character.changeAnimation("gameOver")
    gameOver.visible = true
  }
  drawSprites()
}

function spawnEnemies() {
  if (frameCount % 30 == 0) {
    var num = Math.round(random(1,2))
    var img
    if (num == 1) {
      img = enemy1Img
    }
    else {
      img = enemy2Img
    }

    enemy = createSprite(random(0,width),-50)
    enemy.addImage(img)
    enemy.lifetime = 100
    enemy.velocityY = 10
    enemies.add(enemy)
  }
}