import { skillsContainer, size, list } from './index';
import { randomInt } from './functions';
import { Sprite, Ticker } from 'pixi.js-legacy'


export class Skill {
    sprite: Sprite;
    startingPos: number[] = []; // x, y
    multiSin: number = 0; // 15 - 50
    multiIt: number = 0; // 0.025 - 0.05
    it: number = 0;
    floating: Ticker = new Ticker();
    ratio: number = 1;

    constructor(s: Sprite) {
        this.sprite = s;
        skillsContainer.addChild(this.sprite);

        this.sprite.anchor.set(0.5, 0.5);

        this.setSize()

        this.setMultis()

        this.setPosition();

        this.floating.add((delta) => {
            this.sprite.position.y = this.startingPos[1] + Math.sin(this.it) * this.multiSin;
            if(this.it >= 2 * Math.PI){
                this.it = 0;
            }else{
                this.it += this.multiIt;
            }
        });

        this.floating.start();

    }

    setMultis(){
        this.multiSin = randomInt(window.innerHeight / 3 - size / 2, window.innerHeight / 2 - size / 2);
        this.multiIt = randomInt(25, 50) / 1000;
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

    setPosition(){
        this.sprite.position.y = window.innerHeight / 2;
        if(this.startingPos.length == 0){
            this.sprite.position.x = size * (skillsContainer.children.length - 1) + size / 2;
        }else{
            this.sprite.position.x = size * (list.indexOf(this)) + size / 2;
        }
        this.startingPos = [this.sprite.position.x, this.sprite.position.y];
    }
}