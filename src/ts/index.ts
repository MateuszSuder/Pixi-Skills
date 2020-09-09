import { Application, Sprite, Container, Loader, Ticker, filters } from "pixi.js-legacy";
import { Skill } from "./Skill";
import { randomInt } from "./functions";

export const app = new Application({ transparent: true });

document.body.appendChild(app.view);

app.loader.baseUrl = "src/img/";

app.loader
  .add("Angular", "Angular.png")
  .add("CSS3", "CSS3.png")
  .add("Git", "Git.png")
  .add("HTML5", "HTML5.png")
  .add("jQuery", "jQuery.png")
  .add("JavaScript", "js.png")
  .add("npm", "npm.png")
  .add("PixiJS", "pixi.png")
  .add("Sass", "SASS.png")
  .add("TypeScript", "ts.png")
  .add("webpack", "webpack.png");

app.loader.onComplete.add(doneLoading);
app.loader.load();

export let size: number = 0;

function setSize(){
  size = (window.innerWidth / Object.keys(app.loader.resources).length);
}


export let skillsContainer: Container = new Container();
export let list: Skill[] = [];

function doneLoading() {
  resize();

  setSize();

  let sprites: Sprite[] = []
  for (let i in app.loader.resources) {
    let sprite: Sprite = Sprite.from(app.loader.resources[i].texture);
    sprites.push(sprite)
  }
  for(let i = 0; i < Object.keys(app.loader.resources).length; i++){
    let temp = randomInt(0, sprites.length - 1);
    list.push(new Skill(sprites[temp]));
    sprites.splice(temp, 1)
  }

  app.stage.addChild(skillsContainer);

  window.addEventListener("resize", resize);

  function resize() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    setSize();
    list.forEach(el => {
      el.setSize();
      el.setMultis();
      el.setPosition();
    }) 
  }

}


