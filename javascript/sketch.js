//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variavel colisao
let colidiu = false;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 10;
let alturaRaquete = 90;

//variaveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//placar do jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let ponto;
let raquetada;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");

}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  moveBolinha();
  rebateBolinha();
  mostraRaquete(xRaquete, yRaquete);
  velocidadeRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
}

function mostraBolinha(){
circle(xBolinha, yBolinha, diametro);
}

function moveBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;  
}

function rebateBolinha(){
  if (xBolinha + raio > width || 
     xBolinha - raio < 0) {
     velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height ||
     yBolinha - raio < 0 ){
     velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
rect ( x, y, larguraRaquete, alturaRaquete )
}

function velocidadeRaquete(){
  if (keyIsDown (UP_ARROW))
  yRaquete -= 10;
  if (keyIsDown (DOWN_ARROW))
  yRaquete += 10;
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - alturaRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

//function movimentaRaqueteOponente(){
  //if (keyIsDown (87))
  //yRaqueteOponente -= 10;
  //if (keyIsDown (83))
  //yRaqueteOponente += 10;
//}

function colisaoRaquete(){
  if (xBolinha - raio < xRaquete + larguraRaquete && 
      yBolinha - raio < yRaquete + alturaRaquete &&  
      yBolinha + raio > yRaquete)
  xBolinha *= -1
  play.raquetada();
}

function colisaoRaqueteBiblioteca(x, y){
 colidiu = collideRectCircle(x, y, larguraRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function incluiPlacar(pontos, x, y){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
  text(meusPontos, 170, 26);
  
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos +=1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}