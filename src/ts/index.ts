import { Application, Sprite, Container, Loader, Ticker, filters } from "pixi.js-legacy";
import { Skill } from "./Skill";

export const app = new Application({ transparent: true });

document.body.appendChild(app.view);

app.loader.baseUrl = "src/img/";

app.loader
  .add("Angular", "Angular.png")
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

export let bigger = new Loader();
bigger.baseUrl = "src/img/400px";
bigger.add("Angular400px", "Angular.png");

bigger.load();

app.loader.onComplete.add(doneLoading);
app.loader.load();

let skillsL: Skill[] = [];
let skillsH: Skill[] = [];

export let highContainer: Container = new Container();
export let lowContainer: Container = new Container();

export let size: number = 0;

if (window.innerWidth > window.innerHeight) {
  size = window.innerWidth / 20;
} else {
  size = window.innerHeight / 20;
}

export function blurScene(){
  const blur = new filters.BlurFilter();
  blur.blur = 0;
  highContainer.filters = [blur];
  lowContainer.filters = [blur];
  let it = 0;
  const bluring = new Ticker();
  bluring.add((delta) => {
    blur.blur += 0.5;
    if(blur.blur >= 15){
      bluring.destroy();
    }
  })
  bluring.start();
}

function doneLoading() {
    resize();

    if (window.innerWidth > window.innerHeight) {
        highContainer.position.x = highContainer.position.y = 0;
        lowContainer.position.x = window.innerWidth / 2;
        lowContainer.position.y = 0;
    } else {
        highContainer.position.x = highContainer.position.y = 0;
        lowContainer.position.x = 0;
        lowContainer.position.y = window.innerHeight / 2;
    }

    for (let i in app.loader.resources) {
        let sprite: Sprite = Sprite.from(app.loader.resources[i].texture);
        sprite.interactive = true;
        sprite.cursor = "pointer";

        if (i != "C++" && i != "Java" && i != "PHP" && i != "MySQL" && i != "Node.js") {
            skillsH.push(new Skill(sprite, true, i));
        } else {
            skillsL.push(new Skill(sprite, false, i));
        }

        app.stage.addChild(highContainer, lowContainer);
    }
}

window.addEventListener("resize", resize);

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
}
