var fundo, fundo_img;
var cogumelo, cogumelo_img;
var moeda, moeda_img;
var planta, planta_img;
var gameState = "play";
var placar;

function preload(){
    fundo_img = loadImage("fundo2.jpg");
    cogumelo_img = loadImage("cogumelo.webp");
    moeda_img = loadImage("moeda.webp");
    planta_img = loadImage("planta.png");
}

function setup(){
    createCanvas(600,600);
    fundo = createSprite(300,200);
    fundo.addImage(fundo_img);
    fundo.velocityY = -2;

    cogumelo = createSprite(300,300);
    cogumelo.addImage(cogumelo_img);
    cogumelo.velocityY = -2;
    cogumelo.scale = 0.4;

    moedaGrupo = new Group();
    plantaGrupo = new Group();
}

function draw(){
    background(0);
    drawSprites();

    if(gameState === "play"){
        if(fundo.y > 600){
            fundo.y = fundo.height/14;
          }
          if(keyWentDown("space")){
            cogumelo.addImage(cogumelo_img);
            cogumelo.velocityY = -10;
          }else if(keyWentUp("space")){
            cogumelo.addImage(cogumelo_img);
          }
          if(keyDown("left")){
            cogumelo.x -= 5;
          }
          if(keyDown("right")){
            cogumelo.x += 5;
          }
         cogumelo.velocityY += 0.5;
        }
         if(cogumelo.isTouching(moedaGrupo)){ 
            // placar += 1;
            moedaGrupo.destroyEach();
        }
        if(cogumelo.isTouching(plantaGrupo)||cogumelo.y > 600){ 
            // placar -= 1;
            cogumelo.destroy();
            plantaGrupo.destroyEach();
            textSize(30);
            fill("yellow");
            text("FIM DE JOGO", 200,300);
            gameState = "end";
        }

    moeda();
    planta();
    // textSize(12);
    // textFont("arial Black");
    // text("Pontuação: " + placar, 200,30); 
}

function moeda() {
    if(frameCount%150 === 0){
    var moeda = createSprite(random(150,500),-50);
    moeda.addImage(moeda_img);
    moeda.velocityY = 2;
    moeda.lifetime = 300;
    moeda.scale = 0.2;
    moedaGrupo.add(moeda);
}
}

function planta() {
    if(frameCount%300 === 0){
    var planta= createSpriteround(random(200,500),-50);
    planta.addImage(planta_img);
    planta.velocityY = 2;
    planta.lifetime = 300;
    planta.scale = 0.1;
    plantaGrupo.add(planta);
}
}