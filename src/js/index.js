import { Application, Sprite, Container } from "pixi.js-legacy";
import { Skill } from "./Skill";
import { randomInt } from "./functions";
export var app = new Application({ transparent: true });
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
export var size = 0;
function setSize() {
    size = (window.innerWidth / Object.keys(app.loader.resources).length);
}
export var skillsContainer = new Container();
export var list = [];
function doneLoading() {
    resize();
    setSize();
    var sprites = [];
    for (var i in app.loader.resources) {
        var sprite = Sprite.from(app.loader.resources[i].texture);
        sprites.push(sprite);
    }
    for (var i = 0; i < Object.keys(app.loader.resources).length; i++) {
        var temp = randomInt(0, sprites.length - 1);
        list.push(new Skill(sprites[temp]));
        sprites.splice(temp, 1);
    }
    app.stage.addChild(skillsContainer);
    window.addEventListener("resize", resize);
    function resize() {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        setSize();
        list.forEach(function (el) {
            el.setSize();
            el.setMultis();
            el.setPosition();
        });
    }
}
