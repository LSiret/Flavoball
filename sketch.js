let life = 1;
let cheat = 0;
let stage = 2;
let home = 1;
let winner = 0;
let deathCount;
let MODE; 

function homeScreen() {
  if (level == -1) {
    home = 1;
    textAlign(CENTER);
    textSize(width / 4);
    fill(0)
    text("Flavoball", width / 2, height / 2.5);
    textAlign(CENTER)
    textSize(width / 50)
    text("Controls:", width / 2, height - 30)
    text("Arrow keys to move", width / 2, height)
    text("Instuctions:", width / 2, height / 1.5)
    text("- Go up to proceed", width / 2, height / 1.5)
    textAlign(LEFT)
    text("Version 3.1", 0, height - 0.5)
    textAlign(CENTER)
    textSize(width / 20)
    if (eHigh > 0) {
      textSize(20)
      text("Highscore: " + eHigh, width / 1.5, height / 1.5)
      if (deathCount == 1) {
        textSize(20)
        text("Highscore: " + deathCount + " death", width / 3, height / 1.5)
      } else {
        textSize(20)
        text("Highscore: " + deathCount + " deaths", width / 3, height / 1.5)
      }
    } else if (deathCount == 1) {
      textSize(20)
      text("Highscore: " + deathCount + " death", width / 2, height / 1.5)
    } else if (deathCount > -1) {
      textSize(20)
      text("Highscore: " + deathCount + " deaths", width / 3, height / 1.5)
    }
  } else {
    home = 0;
  }
}

function Game() {
  if (height < 250) {
    cheat = 1
  } else {
    cheat = 0
  }
}

function win() {
  if (level >= 13) {
    if (dif == 4) {
      winner = 2;
    } else {
    winner = 1;
    }
    storeItem("winner", winner)
    resGame = 0;
    if (life < int(deathCount)) {
      deathCount = life;
      storeItem("deathCount", deathCount)
    } else if (deathCount == -1) {
      deathCount = life;
      storeItem("deathCount", deathCount)
    }
    background(0, 255, 0);
    textSize(50);
    textAlign(CENTER);
    fill(0, 0, 255);
    text("YOU WIN", width / 2, 50);
    text("Congrtulations on completing 'Flavoball'!", width / 2, height / 2 - 50);
    textSize(30);
    text("You can now play 'Endless' mode.", width / 2, height / 2);
    text("Or you can try to beat your death count of " + deathCount, width / 2, height / 2 + 50);
    textSize(10);
    text("(Click to restart)", width / 2, height / 2 + 60);

    if (mouseIsPressed) {
      life = 1;
      resGame = 0;
      home_Button();
    }
  }
}

class homePlay {
  constructor() {
    this.x = width / 2
    this.y = height / 1.1
  }
  update() {
    if (winner == 2) {
      fill(255,255,50)
    }
    else {
      fill(255, 255, 255)
    }
    ellipse(this.x, this.y, 20, 20);
    if (keyCode === UP_ARROW && keyIsPressed) {
      this.y = this.y - 2
    } else if (keyCode === DOWN_ARROW && keyIsPressed) {
      this.y = this.y + 2
    } else if (keyCode === LEFT_ARROW && keyIsPressed) {
      this.x = this.x - 2
    } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
      this.x = this.x + 2
    }
  }
}

//Creating an enemy
class Enemy {
  constructor() {
    this.side = 2
    if (this.side < 2) {
      this.x = random(0, height);
      this.y = 10;
    } else {
      this.y = random(height - 30, 0);
      this.x = 10;
    }
    this.gra = random(0.5, 1);
    this.v = 0;
    this.destroy = 0;
  }
  update() {
    if (this.side < 2) {
      this.y = this.y + this.gra * this.v;
      if (this.y < height - 5) {
        this.v += 0.5
      } else if (this.y > height - 5) {
        this.v = 0;
        this.g = random(1);
        this.y = random(height, 0);
        this.x = random(10, width - 10)
      }
    } else {
      this.x = this.x + this.gra * this.v;
      if (this.x < width - 5) {
        if (level < 10) {
          this.v += 0.2;
        } else {
          this.v += 0.25;
        }
      } else if (this.x > width - 5) {
        this.v = 0;
        this.g = random(1);
        this.y = random(height / 1.2, 0);
        this.x = 10;
      }
    }
    if (this.destroy != 1) {
      fill(0, 0, 0);
      circle(this.x, this.y, 10);
    }
  }
}

//Creating an object (class) called 'Flavoball'
class Flavoball {
  constructor() {
    this.x = width / 2;
    this.y = height / 1.2;
    this.Dead = 0;
    this.shield = 0;
  }
  update() {
    //Drawing the character
    stroke(150);
    if (winner == 2) {
      fill(255, 255, 0)
    } else if (MODE == 1) {
        fill(50, 200, 200)
      } else if (MODE == 2) {
      fill(50, 250, 250)
    }

    ellipse(this.x, this.y, 25, 25);

    if (MODE == 1) {
      if (level < 1) {
        this.x += random(-50, 50);
      } else if (level == 1) {
        this.x += random(-20, 20)
      } else if (level == 2) {
        this.x += random(-15, 15)
      } else if (level == 3) {
        this.x += random(-10, 10)
      } else if (level == 4) {
        this.x += random(-5, 5)
      } else if (level == 5) {
        this.x += random(-5, 5)
      }
    }
    this.shield -= 0.5
    if (winner == 1) {
      if (key === ' ' && keyIsPressed) {
        this.shield = 100;
      }
    }

    //resetting off bottom/top of the screen
    if (this.y < 0) {
      for (let i = 1; i < 31; i++) {
        evul[i].x = 0
        evul[i].v = 0
      }
      level += 1
      stage = 2
      this.y = height
      if (MODE == 1) {
        if (level < 7) {
          this.x = width / 2
        }
      }
    } else if (this.y > height - 10) {
      this.y = height - 10
    }

    //resetting off the sides of the screen
    if (this.x < 0) {
      this.x = width

    } else if (this.x > width) {
      this.x = 0
    }
    if (keyCode === UP_ARROW && keyIsPressed) {
      this.y = this.y - 2
    } else if (keyCode === DOWN_ARROW && keyIsPressed) {
      this.y = this.y + 2
    } else if (MODE == 1) {
      if (level >= 6) {
        if (keyCode === LEFT_ARROW && keyIsPressed) {
          this.x = this.x - 2
        } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
          this.x = this.x + 2
        }
      }
    } else if (MODE == 2) {
      if (keyCode === LEFT_ARROW && keyIsPressed) {
        this.x = this.x - 2
      } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
        this.x = this.x + 2
      }
    }
    if (this.shield >= 1) {
      fill(0, 255, 0)
    }
  }
}

var evul = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  winner = getItem("winner")
  if (winner == null) {
    winner = 0;
  }
  dif = getItem("dif");
  if (dif === null) {
    dif = "0"
  }
  life = getItem("life");
  if (life === null) {
    life = "0"
  }
  inGame = getItem("inGame");
  if (inGame === null) {
    inGame = "0";
  }
  resGame = getItem("resGame");
  if (resGame === null) {
    resGame = "0";
  }
  restart = createButton('Reset');
  play = createButton('New game');
  easy = createButton('Easy');
  easy.hide();
  normal = createButton('Normal');
  normal.hide();
  hard = createButton('Hard');
  hard.hide();
  extreme = createButton('Extreme');
  extreme.hide();
  homeButton = createButton('Home');
  saveButton = createButton('Save');
  saveButton.hide();
  resumeButton = createButton('Resume');
  resumeButton.hide();
  textAlign(CENTER);
  eHigh = getItem("ehigh");
  if (eHigh === null) {
    eHigh = "0";
  }
  deathCount = getItem("deathCount");
  if (deathCount === null) {
    deathCount = "-1";
  }
  endless = createButton('Endless');
  if (deathCount == -1) {
    endless.remove();
  }
  Ball = new Flavoball();
  homeBall = new homePlay();
  for (let i = 1; i < 101; i++) {
    evul[i] = new Enemy();
  }
  stage = 2;
  level = -1;
  Ball.Dead = 0;
}

function play_Button() {
  MODE = -5;
  life = 0;
  resGame = 0;
  level = 0;
  play.remove();
  resumeButton.hide();
  if (deathCount > -1) {
    endless.remove();
  }
  createCanvas(windowWidth, windowHeight);
  Ball = new Flavoball();
  for (let i = 1; i < 31; i++) {
    evul[i] = new Enemy();
  }
  stage = 2
  Ball.Dead = 0;
}

function home_Button() {
  MODE = 0;
  restart.hide();
  saveButton.hide();
  easy.hide();
  normal.hide();
  hard.hide();
  extreme.hide();
  level = -1;
  if (home == 0) {
    home = 1;
    if (deathCount > -1) {
      endless = createButton('Endless')
    }
    play = createButton('New game');
  }
}

function save_Button() {
  inGame = level;
  resGame = 1;
}

function resume_Button() {
  MODE = 1;
  Ball.y = height;
  resumeButton.hide();
  home = 0;
  level = inGame;
  resGame = 1;
  play.remove();
  if (deathCount > -1) {
    endless.remove();
  }
}

function endless_Button() {
  MODE = 2;
  endless.hide();
  play.remove();
  createCanvas(windowWidth, windowHeight);
  Ball = new Flavoball();
  for (let i = 1; i < 101; i++) {
    evul[i] = new Enemy();
  }
  level = 0;
  Ball.Dead = 0;
}

function easy_Button() {
  restart.hide();
  easy.hide();
  normal.hide();
  hard.hide();
  extreme.hide();
  dif = 1;
  MODE = 1;
}

function normal_Button() {
  restart.hide();
  easy.hide();
  normal.hide();
  hard.hide();
  extreme.hide();
  dif = 2;
  MODE = 1;
}

function hard_Button() {
  restart.hide();
  easy.hide();
  normal.hide();
  hard.hide();
  extreme.hide();
  dif = 3
  MODE = 1;
}

function extreme_Button() {
  restart.hide();
  easy.hide();
  normal.hide();
  hard.hide();
  extreme.hide();
  dif = 4
  MODE = 1;
}

function restart_Button() {
  restart.hide();
  deathCount = -1;
  eHigh = 0;
  winner = 0;
  storeItem("deathCount", deathCount);
  storeItem("eHigh", eHigh);
  storeItem("winner", winner);
  home_Button();
}

function buttons() {
  if (MODE == -5) {
    restart.show();
    easy.show();
    normal.show();
    hard.show();
    extreme.show();
    restart.position(width / 2, 0)
    easy.position(width / 5, height / 2);
    normal.position(width / 3, height / 2);
    hard.position(width / 2, height / 2);
    extreme.position(width / 1.5, height / 2);
    restart.mousePressed(restart_Button);
    easy.mousePressed(easy_Button);
    normal.mousePressed(normal_Button);
    hard.mousePressed(hard_Button);
    extreme.mousePressed(extreme_Button);
  }
  if (MODE == 1) {
    saveButton.show();
    saveButton.position(width - 47, 0);
    saveButton.mousePressed(save_Button)
    if (level >= 1) {
      resGame = 1;
    }
  }
  if (home == 1) {
    if (resGame == 1) {
      resumeButton.show();
      resumeButton.mousePressed(resume_Button);
      if (deathCount > -1) {
        resumeButton.position(width / 3, height / 2 + 23);
      } else {
        resumeButton.position(width / 2, height / 2 + 23);
      }
    }
    if (deathCount > -1) {
      play.position(width / 3 - 6, height / 2);
    } else {
      play.position(width / 2 - 6, height / 2);
    }
    play.mousePressed(play_Button);
    homeButton.position(0, 0);
    homeButton.mousePressed(home_Button);
    if (deathCount > -1) {
      endless.position(width / 1.5, height / 2);
      endless.mousePressed(endless_Button);
    }
  }
}

function eScore() {
  if (MODE == 2) {
    if ((level - 3) > eHigh) {
      eHigh = level - 3;
      storeItem("ehigh", eHigh);
    }
  }
}

function reset() {
  life += 1;
  if (MODE == 1) {
    if (level >= 11) {
      level = 11;
    } else if (level >= 8) {
      level = 8;
    } else if (level >= 5) {
      level = 5;
    } else {
      level = 0;
    }
  } else {
    level = 2;
  }
  createCanvas(windowWidth, windowHeight);
  Ball = new Flavoball();
  for (let i = 1; i < 31; i++) {
    evul[i] = new Enemy();
  }
  stage = 2
  Ball.Dead = 0;
}

function Death() {
  if (level > 1) {
    for (let i = 1; i < 101; i++) {
      var d = dist(Ball.x, Ball.y, evul[i].x, evul[i].y);
      if (d < 25) {
        if (level == 2) {
          Ball.Dead = 1;
        } else {
          background(255);
          reset();
          Ball.Dead = 0;
          if(level > 2) {
            Ball.y = height;
          }
        }
      }
    }
  }
}

function Voice() {
  if (Ball.y <= height / 2) {
    stage = 0
  }
  if (MODE == -5) {
    textSize(30)
    textAlign(CENTER)
    fill(50, 250, 0)
    text("SELECT YOUR DIFFICULTY", width / 2, height / 3)
    textSize(15)
    text("(Highscore carries across difficulties)", width / 2, height / 2.5)
  } else if (MODE == 1) {
    if (level == 4) {
      textSize(10)
      fill(255, 255, 50)
      text("CHECKPOINT", width / 2, 10)
    } else if (level == 7) {
      textSize(10)
      fill(255, 255, 50)
      text("CHECKPOINT", width / 2, 10)
    } else if (level == 10) {
      textSize(10)
      fill(255, 255, 50)
      text("CHECKPOINT", width / 2, 10)
    }
    fill(0)
    textSize(width / 50)
    if (level < 1) {
      fill(random(0, 25))
      if (stage == 2) {
        textAlign(LEFT)
        text("Hello there, you appear to be infected.", 10, height / 5)
      } else {
        if (life > 1) {
          textAlign(LEFT)
          text("Come back!", width / 2, height / 2)
        } else {
          textAlign(LEFT)
          text("Where are you going? I know how to help you!", width / 2, height / 2)
        }
      }
    }
    if (level == 1) {
      fill(random(0, 50))
      if (stage == 2) {
        if (life > 1) {
          textAlign(LEFT)
          text("Why does...?", 10, height / 5)
        } else {
          textAlign(LEFT)
          text("You know, it's rude to ignore people...", 10, height / 5)
        }
      } else {
        if (life > 1) {
          textAlign(LEFT)
          text("Oh well. Are you going to continue with this disrespect?", width / 2, height / 2)
        } else {
          textAlign(LEFT)
          text("... Especially those with greater power. ", width / 2, height / 2)
        }
      }
    }
    if (level == 2) {
      fill(random(0, 75))
      if (Ball.Dead == 1) {
        textAlign(CENTER)
        text("HAHAHAHA, YOU POUSSIN CROISSANT!", width / 2, height / 2)
        text("YOU THOUGHT I WAS JUST GOING TO HELP YOU AFTER YOU DISRESPECTED ME?", width / 2, height / 2 + width / 50)
        textAlign(CENTER)
        text("YOU'LL HAVE TO FIGURE IT OUT FOR YOURSELF!", width / 2, height / 2 + width / 25)
      } else if (stage == 2) {
        textAlign(LEFT)
        text("Fine, I see how it is..", 10, height / 5)
      } else {
        textAlign(CENTER)
        text("Just take one of my pellets then, if you won't allow me to explain.", width / 2, height / 2)
      }
    }
    if (level == 3) {
      fill(random(0, 75))
      if (Ball.Dead == 1) {
        if (stage == 2) {
          textAlign(LEFT)
          text("YOU'RE GOING TO FEEL THE WRATH..", width / 2, height / 5)
        } else {
          textAlign(LEFT)
          text("...OF MY PENITRATION PELLETS!!!", width / 2, height / 2)
        }
      } else if (stage == 2) {
        textAlign(LEFT)
        text("So...", width / 2, height / 5)
      } else {
        textAlign(LEFT)
        text("You think you're funny huh?", width / 2, height / 2)
      }
    }
    if (level == 4) {
      fill(random(0, 75))
      if (Ball.Dead == 1) {
        if (stage == 2) {
          textAlign(LEFT)
          text("HAHAHAHA!!!", width / 3, height / 2.6)
        } else {
          textAlign(LEFT)
          text("Huh?", width / 2, height / 2)
        }
      } else if (stage == 2) {
        textAlign(LEFT)
        text("I'LL...I'LL...", width / 2, height / 5)
      } else {
        textAlign(LEFT)
        text("I'LL SHOW YOU NOT TO MESS WITH ME!", width / 2, height / 2)
      }
    }
    if (level == 5) {
      if (stage == 2) {
        textAlign(LEFT)
        text("What's happening?", width / 6, height / 3)
      } else {
        textAlign(RIGHT)
        text("HOW?", width / 2, height / 2)
      }
    }
    if (level == 6) {
      if (stage == 2) {
        textAlign(LEFT)
        if (winner != 1) {
          text("YOU'VE ALREADY RECOVERED!?", width / 6, height / 3)
        } else {
          text("YOU'VE ALREADY RECOVERED FROM MY INFECTION!?", width / 6, height / 3)
        }
      } else {
        textAlign(CENTER)
        if (winner != 1) {
          text("Looks like I'm going to have to get serious...", width / 2, height / 2)
        } else {
          text("MY poison... MY creation... FAILED!?", width / 2, height / 2)

        }
      }
    }
    if (level == 7) {
      textAlign(CENTER)
      if (winner != 1) {
        text("TRYHARD.exe ... initiated.", width / 2, height / 2)
      } else {
        text("I'LL HAVE TO JUST INFECT YOU AGAIN!", width / 2, height / 2)
      }
    }

    if (level == 9) {
      textAlign(CENTER)
      text("Wait - please! Stop!", width / 2, height / 2)
    }

    if (level == 10) {
      textAlign(CENTER)
      text("JUST DIE!!!!!!", width / 2, height / 2)
    }

    if (level == 11) {
      if (Ball.y >= height / 2) {
        textAlign(LEFT)
        text("Wha...", width / 6, height / 3)
      } else {
        textAlign(CENTER)
        text("Have I been defeated...?", width / 2, height / 2)
      }
    }

    if (level == 12) {
      if (stage == 2) {
        textAlign(LEFT)
        text("But... I only got...", width / 6, height / 3)
      } else {
        textAlign(CENTER)
        text(life + " of them...", width / 2, height / 2)
      }
    }
  } else if (MODE == 2) {
    textSize(width / 20)
    fill(50)
    if (level == 0) {
      textAlign(CENTER)
      text("Welcome to endless mode.", width / 2, height / 2)
    } else if (level == 1) {
      textAlign(CENTER)
      text("In this mode, the objective", width / 2, height / 2)
      text("is to get as far as possible.", width / 2, height / 2 + 30)
    } else if (level == 2) {
      textAlign(CENTER)
      text("Every section will be harder than the last.", width / 2, height / 2)
      text("Good luck!", width / 2, height / 1.5)
    }
  }
}

function BG() {
  if (home == 1) {
    if (winner == 2) {
      background(255, 255, 0)
    } else {
      background(0, 50, 255)
    }
  } else if (MODE == 1) {
    if (level == 0) {
      background(250, 250, 250);
    } else if (level == 1) {
      background(250, 150, 0);
    } else if (level == 2) {
      background(250, 0, 0);
    } else if (level > 3 < 13) {
      background(175, 0, 0);
    }
  } else if (MODE == 2) {
    background(255, 0, 0)
  } else {
    background(0, 0, 255)
  }
}

function Espawn() {
  if (MODE == 1) {
    if (level < 13) {
      if (level < 11) {
        if (dif == 1) {
          if (level >= 2) {
          evul[1].update();
        }
        if (level >= 3) {
          evul[2].update();
          evul[3].update();
        }
        if (level >= 4) {
          evul[4].update();
        }
        if (level >= 5) {
          evul[5].update();
        }
        if (level == 7) {
          evul[6].update();
          evul[7].update();
          evul[8].update();
        }
        if (level == 10) {
          evul[9].update();
          evul[10].update();
          evul[11].update();
          evul[12].update();
          evul[13].update();
          evul[14].update();
        }
        } 
        else if (dif == 2) {
        if (level >= 2) {
          evul[1].update();
        }
        if (level >= 3) {
          evul[2].update();
          evul[3].update();
          evul[4].update();
        }
        if (level >= 4) {
          evul[5].update();
          evul[6].update();
        }
        if (level >= 5) {
          evul[7].update();
          evul[8].update();
        }
        if (level == 7) {
          evul[9].update();
          evul[10].update();
          evul[11].update();
          evul[12].update();
          evul[13].update();
          evul[14].update();
          evul[15].update();
          evul[16].update();

        }
        if (level == 10) {
          evul[9].update();
          evul[10].update();
          evul[11].update();
          evul[12].update();
          evul[13].update();
          evul[14].update();
          evul[15].update();
          evul[16].update();
          evul[17].update();
          evul[18].update();
          evul[19].update();
          evul[20].update();
          evul[21].update();
        }
        }
        else if (dif == 3) {
          if (level >= 2) {
          evul[1].update();
          evul[2].update();
        }
        if (level >= 3) {
          evul[3].update();
          evul[4].update();
          evul[5].update();
          evul[6].update();
        }
        if (level >= 4) {
          evul[7].update();
          evul[8].update();
          evul[9].update();
        }
        if (level >= 5) {
          evul[10].update();
          evul[11].update();
          evul[12].update();
        }
        if (level == 7) {
          evul[13].update();
          evul[14].update();
          evul[15].update();
          evul[16].update();
          evul[17].update();
          evul[18].update();
          evul[19].update();
          evul[20].update();
          evul[21].update();

        }
        if (level == 10) {
          evul[22].update();
          evul[23].update();
          evul[24].update();
          evul[25].update();
          evul[26].update();
          evul[27].update();
          evul[28].update();
          evul[29].update();
          evul[30].update();
          evul[31].update();
          evul[32].update();
          evul[33].update();
          evul[34].update();
          evul[35].update();
          evul[36].update();
        }
        } 
        else if (dif == 4) {
        if (level >= 2) {
          evul[1].update();
        }
        if (level >= 3) {
          evul[2].update();
          evul[3].update();
          evul[4].update();
          evul[5].update();
          evul[6].update();
          evul[7].update();
        }
        if (level >= 4) {
          evul[8].update();
          evul[9].update();
          evul[10].update();
          evul[11].update();
          evul[12].update();
        }
        if (level >= 5) {
          evul[13].update();
          evul[14].update();
          evul[15].update();
        }
        if (level == 7) {
          evul[16].update();
          evul[17].update();
          evul[18].update();
          evul[19].update();
          evul[20].update();
          evul[21].update();
          evul[22].update();
          evul[23].update();
          evul[24].update();
          evul[25].update();
          evul[26].update();
          evul[27].update();
          evul[28].update();

        }
        if (level == 10) {
          evul[29].update();
          evul[30].update();
          evul[31].update();
          evul[32].update();
          evul[33].update();
          evul[34].update();
          evul[35].update();
          evul[36].update();
          evul[37].update();
          evul[38].update();
          evul[39].update();
          evul[40].update();
          evul[41].update();
          evul[42].update();
          evul[43].update();
          evul[44].update();
          evul[45].update();
          evul[46].update();
          evul[47].update();
        }
        }
      } else if (level == 11) {
        evul[1].update();
        evul[2].update();
        evul[3].update();
        evul[4].update();
      } else {
        evul[1].update();
      }
    }
  } else if (MODE == 2) {
    if (level >= 3) {
      evul[1].update();
      evul[2].update();
      evul[3].update();
    }
    if (level >= 4) {
      evul[4].update();
    }
    if (level >= 5) {
      evul[5].update();
    }
    if (level >= 6) {
      evul[6].update();
    }
    if (level >= 7) {
      evul[7].update();
    }
    if (level >= 8) {
      evul[8].update();
    }
    if (level >= 9) {
      evul[9].update();
    }
    if (level >= 10) {
      evul[10].update();
    }
    if (level >= 11) {
      evul[11].update();
    }
    if (level >= 12) {
      evul[12].update();
    }
    if (level >= 13) {
      evul[13].update();
    }
    if (level >= 14) {
      evul[14].update();
    }
    if (level >= 15) {
      evul[15].update();
    }
    if (level >= 16) {
      evul[16].update();
    }
    if (level >= 17) {
      evul[17].update();
    }
    if (level >= 18) {
      evul[18].update();
    }
    if (level >= 19) {
      evul[19].update();
    }
    if (level >= 20) {
      evul[20].update();
    }
    if (level >= 21) {
      evul[21].update();
    }
    if (level >= 22) {
      evul[22].update();
    }
    if (level >= 23) {
      evul[23].update();
    }
    if (level >= 24) {
      evul[24].update();
    }
  }
}

function draw() {
  frameRate(120);
  Game();
  if (cheat != 1) {
    BG();
    win();
    homeScreen();
    buttons();
    storeItem("dif", dif)
    storeItem("resGame", resGame)
    storeItem("inGame", inGame)
    storeItem("life", life)
    let hrs = hour();
    let min = minute();
    let sec = second();
    textSize(width / 50)
    textAlign(RIGHT)
    text('Time:' + hrs + ':' + min + ':' + sec, width, height - 1)
    textSize(10)
    eScore();
    Death();
    if (home != 1) {
      textAlign(CENTER)
      if (MODE == 1) {
        text("Section " + level, width / 2, height - 2)
      } else if (MODE == 2) {
        textSize(20)
        text("Highscore: " + eHigh, width / 2, 20)
        if (level >= 3) {
          textSize(10)
          text("Section " + (level - 2), width / 2, height - 2)
        }
      }
      //updating the ball every frame
      Ball.update();
      Espawn();
      Voice();
    } else {
      homeBall.update();
    }
  } else {
    background(50, 255, 255);
    textSize(height / 100);
    textAlign(CENTER)
    text("Sorry, your screen is too small", width / 2, height / 2);
  }
}
