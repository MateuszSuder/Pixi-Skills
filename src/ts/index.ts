import { Application, Sprite, Ticker, Container } from "pixi.js-legacy";
import { randomInt } from "./functions";

const app = new Application({ transparent: true });

document.body.appendChild(app.view);

app.loader.baseUrl = "src/img/";

app.loader.add("Angular", "Angular.png")
.add("C++", "cpp.png")
.add("CSS3", "CSS3.png")
.add("HTML5", "HTML5.png")
.add("Java", "Java.png")
.add("jQuery", "jQuery.png")
.add("JavaScript", "js.png")
.add("MySQL", "mySQL.png")
.add("Node.js", "node.png")
.add("npm", "npm.png")
.add("PHP", "PHP.png")
.add("PixiJS", "pixi.png")
.add("Sass", "SASS.png")
.add("TypeScript", "ts.png")
.add("webpack", "webpack.png");

app.loader.onComplete.add(doneLoading);
app.loader.load();

class Skill {
  sprite: Sprite;
  startingPos: number[]; // x,y
  multiSin: number; // 15 - 50
  multiIt: number; // 0.025 - 0.05
  it: number = 0;
  high: boolean;
  floating: Ticker = new Ticker();
  constructor(s: Sprite, h: boolean) {
    this.high = h;

    this.sprite = s;

    this.multiSin = randomInt(15, 50);
    this.multiIt = randomInt(25, 50) / 1000;

    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.position.x = randomInt(
      this.sprite.width,
      window.innerWidth - this.sprite.width
    );
    this.sprite.position.y = randomInt(
      this.sprite.height + this.multiSin,
      window.innerHeight - this.sprite.height - this.multiSin
    );
    this.startingPos = [this.sprite.position.x, this.sprite.position.y];

    this.floating.add((delta) => {
      this.sprite.position.y =
        this.startingPos[1] + Math.sin(this.it) * this.multiSin;
      this.it += this.multiIt;
    });

    this.floating.start();
  }
}

let skillsL: Skill[] = [];
let skillsH: Skill[] = [];

function doneLoading() {

  resize();

  console.log(Object.keys(app.loader.resources).length)
  let highContainer: Container = new Container();
  let lowContainer: Container = new Container();

  for (let i in app.loader.resources) {
    let sprite: Sprite = Sprite.from(app.loader.resources[i].texture);
    sprite.interactive = true;
    sprite.cursor = 'pointer'; 
    
    if(i != 'C++' && i != 'Java' && i != 'PHP' && i != 'MySQL' && i != 'Node.js'){
        skillsH.push(new Skill(sprite, true));
    }else{
        skillsL.push(new Skill(sprite, false));
    }

    app.stage.addChild(sprite);
  }
}

window.addEventListener("resize", resize);

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}