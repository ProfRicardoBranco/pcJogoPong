//Posição e tamanho da bolinha
let xbolinha = 300;
let ybolinha = 200;
let diametro = 25;
let raio = diametro / 2;

//Velocidade da bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;

//Variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis da Raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let colidiu = false;
let modoPC = true;

//Pontuação
let meusPontos = 0;
let pontosOponente = 0;

//Tela de início de jogo
let xPosDireita = 140;
let comprimentoBotao = 320;
let yPosRetanguloSelecao = 250;
let iniciaJogo = false;

function setup() {
  createCanvas(600, 400);

}

function draw() {
  //Aqui vamos verificar se o jogo pode começar ou se devemos desenhar a tela de início
  if (!iniciaJogo) {
      exibirTelaModoOponente();
    mouseSelecionaModoJogo();
    return; //o comando return interrompe o draw (não executa o que está para baixo)
  }

  background(0);
  incluiPlacar();
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete();
  movimentaRaquete();
  verificaColisao();
  mostraRaqueteOponente();
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
}

//Desenho da bolinha
function mostraBolinha() {
  fill("gold");
  circle(xbolinha, ybolinha, diametro);
}

function movimentaBolinha() {
  xbolinha += velocidadeXbolinha;
  ybolinha += velocidadeYbolinha;
}

function verificaColisaoBorda() {
  if (xbolinha > width || xbolinha < 0) {
    velocidadeXbolinha *= -1;
    marcaPontos();
  }
  if (ybolinha > height || ybolinha < 0) {
    velocidadeYbolinha *= -1;
  }
}

function mostraRaquete() {
  fill("aqua");
  rect(xRaquete, yRaquete, raqueteComprimento, raqueteAltura, 15);
}

function movimentaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 10;
  }
  if (keyIsDown(83)) {
    yRaquete += 10;
  }
}

function verificaColisao() {
  if (
    xbolinha - raio < xRaquete + raqueteComprimento &&
    ybolinha - raio < yRaquete + raqueteAltura &&
    ybolinha + raio > yRaquete
  ) {
    xbolinha = 24;
    velocidadeXbolinha *= -1;
  }
}

function mostraRaqueteOponente() {
  fill("orangered");
  rect(
    xRaqueteOponente,
    yRaqueteOponente,
    raqueteComprimento,
    raqueteAltura,
    15
  );
}

function movimentaRaqueteOponente() {
  if (modoPC) {
    velocidadeYOponente = ybolinha - yRaqueteOponente - raqueteAltura / 2 - 50;
    yRaqueteOponente += velocidadeYOponente;
  } else {
    if (keyIsDown(UP_ARROW)) {
      yRaqueteOponente -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
      yRaqueteOponente += 10;
    }
  }
}

function verificaColisaoRaqueteOponente() {
  colidiu = collideRectCircle(
    xRaqueteOponente,
    yRaqueteOponente,
    raqueteComprimento,
    raqueteAltura,
    xbolinha,
    ybolinha,
    raio
  );
  if (colidiu == true) {
    velocidadeXbolinha *= -1;

    xRaqueteOponente = width - raqueteComprimento;
  }
}

function incluiPlacar() {
  fill("white");
  textSize(30);
  text(/*"Eu "+ */ meusPontos, 250, 30);
  text(pontosOponente, 350, 30);
}

function marcaPontos() {
  if (xbolinha < 0) {
    pontosOponente += 1;
  }
  if (xbolinha > width) {
    meusPontos += 1;
  }
}

function exibirTelaModoOponente() {
  background("#196EB3");

  noStroke();
  fill("#0D0D0E");
  textAlign(CENTER);
  textSize(40);
  text("Menu", width / 2, 100);

  fill("#607D8B");
  //stroke("white");
  rect(xPosDireita, 150, comprimentoBotao, 50, 10);
  rect(xPosDireita, 210, comprimentoBotao, 50, 10);

  textSize(26);
  fill("220, 220, 220");
  text("Jogar contra outro jogador", width / 2, 180);
  text("Jogar contra o computador", width / 2, 240);
}

function mouseSelecionaModoJogo() {
  let xPosEsquerda = xPosDireita + comprimentoBotao;

  if (mouseX > xPosDireita && mouseX < xPosEsquerda) {
    if (mouseY > 150 && mouseY < 200) {
      yPosRetanguloSelecao = 150;
      noFill();
      stroke(220, 220, 220);
      rect(140, yPosRetanguloSelecao, 320, 50, 10);
      if (mouseIsPressed) {
        modoPC = false;
        iniciaJogo = true;
      }
    }
    if (mouseY > 210 && mouseY < 300) {
      yPosRetanguloSelecao = 210;
      noFill();
      stroke(220, 220, 220);
      rect(140, yPosRetanguloSelecao, 320, 50, 10);
      if (mouseIsPressed) {
        modoPC = true;
        iniciaJogo = true;
      }
    }
  }
}
