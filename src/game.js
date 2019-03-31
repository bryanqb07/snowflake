import Sprite from './sprite';

class Game{
    constructor(width, height) {
        this.PADDING = 150;
        this.DIM_X = width;
        this.DIM_Y = height;
        this.boarder = new Sprite(
            [this.DIM_X / 2, 100], [0,0], this, 448, 480, "penguin.png", 5);
        //this.testRock = new Sprite([500, 800], [0, -5], this, 900, 900, "tree.png", 4);
        
        this.OBSTACLE_VEL = [0, -5];
        
        this.fences = [];
        this.FENCE_SPACER = 80;
        this.FENCE_WIDTH = 50;
        this.MAX_FENCES = 12;
        this.makeFences(0);
        this.makeFences(this.DIM_X - this.FENCE_WIDTH);



        this.obstacles = [];
        this.NUM_OBSTACLES = 0;
        this.MAX_OBSTACLES = 10;
        this.PASSED_OBSTACLES = 0;        
        this.last = new Sprite(
            [500, 700], this.OBSTACLE_VEL, this, 600, 300, "tree3.png", 1
        ); // dummy var
     
        this.finishLine = new Sprite([this.FENCE_WIDTH - 25, 1000], this.OBSTACLE_VEL,
            this, 2000, 247, "finish.png", 1.5);
        
        this.gameOver = false;
    }

    checkCollisions() {
        if(this.NUM_OBSTACLES > 0){
            this.obstacles.forEach(obstacle => {
                if (this.boarder.isCollidedWith(obstacle)) {
                    //alert("Collision detected. Game over!");
                    return true;
                }
            });
        }
        if (this.boarder.options.pos[0] < 0 || this.boarder.options.pos[0] > 1300){
            //alert("Out of bounds!");
            return true;
        }
        return false;
    }

    checkWrap(obj) {
        if (this.isOutofBounds([obj.options.pos[0], obj.options.pos[1]])) {
            if (obj.isWrappable) {
                obj.options.pos[1] = this.DIM_Y;
            } else {
                this.obstacles.shift();
                this.NUM_OBSTACLES--;
                this.PASSED_OBSTACLES++;
            }
        }
    }

    draw(ctx){

        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        if (this.PASSED_OBSTACLES >= this.MAX_OBSTACLES) {
            this.finishLine.draw(ctx);
        }
        this.fences.forEach(fence => fence.draw(ctx));
        this.boarder.draw(ctx);
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
    }

    isOutofBounds(pos) {
        return pos[0] < 0 || pos[0] > this.DIM_X || pos[1] + this.PADDING < 0 || pos[1] > this.DIM_Y;
    }

    generateObstacle(){
        if(this.PASSED_OBSTACLES < this.MAX_OBSTACLES && (this.last.options.pos[1] <= 700)){
            this.last = (Math.random()  * 2 >= 1) ? new Sprite(
                [this.randXPos(), 800], this.OBSTACLE_VEL, this, 600, 300, "tree3.png", 1) :
                new Sprite(
                [this.randXPos(), 800], this.OBSTACLE_VEL, this, 512, 512, "rock.png", 2);
            
            this.obstacles.push(this.last);
            this.NUM_OBSTACLES++;
        }
    }

    makeFences(shift){
        for(let i = 0; i < this.FENCE_SPACER * this.MAX_FENCES; i += this.FENCE_SPACER){
            this.fences.push(new Sprite([shift, this.DIM_Y - i], this.OBSTACLE_VEL, this,
                634, 618, "flag.png", 12, true));
        }
    }

    move() {
        this.fences.forEach(fence => {
            fence.move();
            this.checkWrap(fence);
        });
        if (this.PASSED_OBSTACLES >= this.MAX_OBSTACLES) {
            this.finishLine.move();
        }
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
            return true;
        }
        else if (this.finishLine.options.pos[1] < this.boarder.options.pos[1] - 100) { // win condition
            return true;
        }
        else{ // play on
            this.generateObstacle();
            this.move();
            return false;
        }
    }
}

export default Game;