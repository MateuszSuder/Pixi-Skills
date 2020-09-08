import { highContainer, lowContainer, app, bigger, size, blurScene } from './index';
import { randomInt } from './functions';
import { Sprite, Ticker } from 'pixi.js-legacy'


export class Skill {
    sprite: Sprite;
    startingPos: number[]; // x,y
    multiSin: number; // 15 - 50
    multiIt: number; // 0.025 - 0.05
    it: number = 0;
    floating: Ticker = new Ticker();
    ratio: number = 1;
    name: string;

    constructor(s: Sprite, h: boolean, n: string) {
        this.name = n;
        if (h) {
        highContainer.addChild(s);
        } else {
        lowContainer.addChild(s);
        }

        this.sprite = s;

        this.multiSin = randomInt(15, 50);
        this.multiIt = randomInt(25, 50) / 1000;

        this.sprite.anchor.set(0.5, 0.5);

        this.setSize()

        if (window.innerWidth > window.innerHeight) {
            this.sprite.position.x = randomInt(
            this.sprite.width,
            window.innerWidth / 2 - this.sprite.width
            );

            this.sprite.position.y = randomInt(
            this.sprite.height + this.multiSin,
            window.innerHeight - this.sprite.height - this.multiSin
            );
        } else {
            this.sprite.position.x = randomInt(
            this.sprite.width,
            window.innerWidth - this.sprite.width
            );
            this.sprite.position.y = randomInt(
            this.sprite.height + this.multiSin,
            window.innerHeight / 2 - this.sprite.height - this.multiSin
            );
        }

        this.startingPos = [this.sprite.position.x, this.sprite.position.y];

        this.floating.add((delta) => {
            this.sprite.position.y = this.startingPos[1] + Math.sin(this.it) * this.multiSin;
            this.it += this.multiIt;
        });

        this.floating.start();

        this.sprite.on("mousedown", () => {this.handleClick(this.name)})
        this.sprite.on("touchstart", () => {this.handleClick(this.name)})
    }

    handleClick(name: string) {
        blurScene();
        let sprite = Sprite.from(bigger.resources[name+"400px"].texture)
        if(window.innerWidth > window.innerHeight){
            if(sprite.width > sprite.height){
                let scale = sprite.height / sprite.width;
                if(window.innerHeight / 2 > 400){
                    sprite.width = 400;
                    sprite.height = 400 * scale;
                }else{
                    sprite.width = window.innerHeight / 2;
                    sprite.height = sprite.width * scale;
                }
            }else{
                let scale = sprite.width / sprite.height;
                if(window.innerHeight / 2 > 400){
                    sprite.height = 400;
                    sprite.width = 400 * scale;
                }else{
                    sprite.height = window.innerHeight / 2;
                    sprite.width = sprite.height * scale;
                }
            }
            sprite.anchor.set(0.5, 0.5);
            sprite.position.set(window.innerWidth / 4, window.innerHeight / 2);
        }else{
            if(sprite.width > sprite.height){
                let scale = sprite.height / sprite.width;
                if(window.innerHeight / 3 > 400){
                    sprite.width = 400;
                    sprite.height = 400 * scale;
                }else{
                    sprite.width = window.innerHeight / 3;
                    sprite.height = sprite.width * scale;
                }
            }else{
                let scale = sprite.width / sprite.height;
                if(window.innerHeight / 3 > 400){
                    sprite.height = 400;
                    sprite.width = 400 * scale;
                }else{
                    sprite.height = window.innerHeight / 3;
                    sprite.width = sprite.height * scale;
                }
            }
            sprite.anchor.set(0.5, 0.5);
            sprite.position.set(window.innerWidth / 2, sprite.width / 2);
        }
        app.stage.addChild(sprite)
    }

    setSize(){
        if (this.sprite.width > this.sprite.height) {
            this.ratio = this.sprite.height / this.sprite.width;
            this.sprite.width = size;
            this.sprite.height = size * this.ratio;
        } else {
            this.ratio = this.sprite.width / this.sprite.height;
            this.sprite.height = size;
            this.sprite.width = size * this.ratio;
        }
    }
}