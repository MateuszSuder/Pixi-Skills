import { skillsContainer, size, list } from './index';
import { randomInt } from './functions';
import { Ticker } from 'pixi.js-legacy';
var Skill = /** @class */ (function () {
    function Skill(s) {
        var _this = this;
        this.startingPos = []; // x, y
        this.multiSin = 0; // 15 - 50
        this.multiIt = 0; // 0.025 - 0.05
        this.it = 0;
        this.floating = new Ticker();
        this.ratio = 1;
        this.sprite = s;
        skillsContainer.addChild(this.sprite);
        this.sprite.anchor.set(0.5, 0.5);
        this.setSize();
        this.setMultis();
        this.setPosition();
        this.floating.add(function (delta) {
            _this.sprite.position.y = _this.startingPos[1] + Math.sin(_this.it) * _this.multiSin;
            if (_this.it >= 2 * Math.PI) {
                _this.it = 0;
            }
            else {
                _this.it += _this.multiIt;
            }
        });
        this.floating.start();
    }
    Skill.prototype.setMultis = function () {
        this.multiSin = randomInt(window.innerHeight / 3 - size / 2, window.innerHeight / 2 - size / 2);
        this.multiIt = randomInt(25, 50) / 1000;
    };
    Skill.prototype.setSize = function () {
        if (this.sprite.width > this.sprite.height) {
            this.ratio = this.sprite.height / this.sprite.width;
            this.sprite.width = size;
            this.sprite.height = size * this.ratio;
        }
        else {
            this.ratio = this.sprite.width / this.sprite.height;
            this.sprite.height = size;
            this.sprite.width = size * this.ratio;
        }
    };
    Skill.prototype.setPosition = function () {
        this.sprite.position.y = window.innerHeight / 2;
        if (this.startingPos.length == 0) {
            this.sprite.position.x = size * (skillsContainer.children.length - 1) + size / 2;
        }
        else {
            this.sprite.position.x = size * (list.indexOf(this)) + size / 2;
        }
        this.startingPos = [this.sprite.position.x, this.sprite.position.y];
    };
    return Skill;
}());
export { Skill };
