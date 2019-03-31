import MovingObject from './moving_object';
//import Boarder from './boarder';
import Fence from './fence';
import Sprite from './sprite';

class Game{
    constructor(width, height) {
        this.PADDING = 150;
        this.DIM_X = width;
        this.DIM_Y = height;
        this.boarder = new Sprite(
            [this.DIM_X / 2, 100], [0,0], this, 448, 480, "penguin.png", 5);
        // this.testTree = new Sprite(
        //     [500, 800], [0, -5], this, 900, 900, "tree.png", 4
        // );
        this.obstacles = [];
        this.NUM_OBSTACLES = 0;
        this.MAX_OBSTACLES = 3;
        this.PASSED_OBSTACLES = 0;

        this.fences = [];
        this.makeFences(0);
        this.makeFences(this.DIM_X - this.fences[0].width);

    }

    checkCollisions() {
        if(this.NUM_OBSTACLES > 0){
            this.obstacles.forEach(obstacle => {
                if (this.boarder.isCollidedWith(obstacle)) {
                    alert("Collision detected. Game over!");
                    return true;
                }
            });
        }
        return false;
    }

    checkWrap(obj) {
        if (this.isOutofBounds([obj.options.pos[0], obj.options.pos[1]])) {
            if (obj.isWrappable) {
                obj.options.pos[1] = this.DIM_Y;
            } else {
                this.obstacles.pop();
                this.NUM_OBSTACLES--;
                this.PASSED_OBSTACLES++;
            }
        }
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.fences.forEach(fence => fence.draw(ctx));
        this.boarder.draw(ctx);
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
    }


    isOutofBounds(pos) {
        return pos[0] < 0 || pos[0] > this.DIM_X || pos[1] + this.PADDING < 0 || pos[1] > this.DIM_Y;
    }

    generateObstacle(){
        if(this.NUM_OBSTACLES == 0){
            this.obstacles.push( new Sprite(
            [this.randXPos(), 800], [0, -5], this, 900, 900, "tree.png", 4 ));
            this.NUM_OBSTACLES++;
        }
    }

    makeFences(shift){
        for(let i = 0; i < 7000; i+=50){
            const fence = new Fence([shift, this.DIM_Y - i], this);
            this.fences.push(fence);
        }
    }

    move() {
        this.fences.forEach(fence => {
            fence.move();
            this.checkWrap(fence);
        });
        this.boarder.move();
        this.obstacles.forEach(obstacle => {
            obstacle.move();
            this.checkWrap(obstacle);
        });
    }


    randXPos(){
        let xVal = 0;
        while (xVal < this.PADDING || xVal > this.DIM_X - this.PADDING) {
                xVal = Math.floor(Math.random() * this.DIM_X);
        }
        return xVal;
    }

    step() {
        if (this.checkCollisions()) { // lose condition
            return;
        } 
        else if (this.PASSED_OBSTACLES >= this.MAX_OBSTACLES) { // win condition
            alert("Level passed!");
            return;
        }
        else{ // play on
            this.generateObstacle();
            this.move();
        }
    }
}

export default Game;