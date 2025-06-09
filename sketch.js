let boi;
let milhos = [];
let score = 0;
let tempo = 20; // tempo de jogo em segundos 
let gameOver = false;
let startTime;
let jogoComecou = false;

function setup() {
  createCanvas(600, 400);
  boi = new Boi();
  for (let i = 0; i < 20; i++) {
    milhos.push(new Milho());
  }
}

function draw() {
  // cor de fundo baseada no foco
  if (focused == true) {
    background("#0CC03F");
  } else {
    background("#A6F1AB");
  }

  if (!jogoComecou) {
    // Tela inicial com instruções
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(0);
    text("Use as setas para mover o boi 🐂\nColete os milhos 🌽 e transforme em moedas 🪙\nClique para começar a jogar!", width / 2, height / 2);
    return; // sai do draw até clicar
  }

  // emojis decorativos
  textSize(40);
  text("🐂", 10, height - 40);
  text("🌾", 60, height - 40);
  text("🧑‍🌾", 110, height - 40);

  if (startTime === undefined) {
    startTime = millis();
  }

  if (!gameOver) {
    // tempo restante
    let elapsed = (millis() - startTime) / 1000;
    let remaining = max(0, tempo - int(elapsed));
    if (remaining <= 0) {
      gameOver = true;
    }

    // mostrar e mover boi
    boi.move();
    boi.show();

    // mostrar e verificar milho
    for (let i = milhos.length - 1; i >= 0; i--) {
      milhos[i].show();
      if (boi.eat(milhos[i])) {
        milhos.splice(i, 1);
        score++;
      }
    }

    // placar e tempo
    fill(0);
    textSize(20);
    textAlign(LEFT, TOP);
    text("🌽 Comidos: " + score + " 🪙", 10, 30);
    text("⏳ Tempo: " + remaining + "s", 10, 60);
  } else {
    fill(0);
    textSize(30);
    textAlign(CENTER, CENTER);
    text("Fim de jogo! 🐂💤", width / 2, height / 2 - 20);
    text("Você ganhou " + score + " moedas! 🪙", width / 2, height / 2 + 20);
  }
}

function mousePressed() {
  if (!jogoComecou) {
    jogoComecou = true;
    startTime = millis();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    boi.xdir = -1;
    boi.ydir = 0;
  } else if (keyCode === RIGHT_ARROW) {
    boi.xdir = 1;
    boi.ydir = 0;
  } else if (keyCode === UP_ARROW) {
    boi.xdir = 0;
    boi.ydir = -1;
  } else if (keyCode === DOWN_ARROW) {
    boi.xdir = 0;
    boi.ydir = 1;
  }
}

class Boi {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 40;
    this.speed = 3;
    this.xdir = 0;
    this.ydir = 0;
  }

  move() {
    this.x += this.xdir * this.speed;
    this.y += this.ydir * this.speed;

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  show() {
    textSize(this.size);
    text("🐂", this.x, this.y);
  }

  eat(milho) {
    let d = dist(this.x, this.y, milho.x, milho.y);
    return d < this.size;
  }
}

class Milho {
  constructor() {
    this.x = random(width - 30);
    this.y = random(height - 30);
    this.size = 30;
  }

  show() {
    textSize(this.size);
    text("🌽", this.x, this.y);
  }
}

  
