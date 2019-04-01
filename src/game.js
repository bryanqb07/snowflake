import Sprite from './sprite';

class Game{
    constructor(width, height) {
        this.PADDING = 150;
        this.DIM_X = width;
        this.DIM_Y = height;
        this.boarder = new Sprite(
            [this.DIM_X / 2, 100], [0,0], this, 448, 480, "penguin2.png", 5);
        //this.testRock = new Sprite([500, 800], [0, -5], this, 900, 900, "tree.png", 4);
        this.level = 1;

        this.OBSTACLE_VEL = [0, -5];
        
        this.fences = [];
        this.FENCE_SPACER = 80;
        this.FENCE_WIDTH = 50;
        this.MAX_FENCES = 12;
        this.makeFences(0);
        this.makeFences(this.DIM_X - this.FENCE_WIDTH);

        // this.last = new Sprite(
        //     [500, 700], this.OBSTACLE_VEL, this, 600, 300, "tree3.png", 1
        // ); // dummy var
        this.dummy = new Sprite(
            [500, 600], this.OBSTACLE_VEL, this, 600, 300, "tree3.png", 2);
        this.obstacles = [this.dummy];
        // dummy var included 

        
        
        this.NUM_OBSTACLES = 1;
        this.MAX_OBSTACLES = 10 * this.level;
        this.PASSED_OBSTACLES = 0;        

     

        this.finishLine = new Sprite([this.FENCE_WIDTH - 25, 1000], this.OBSTACLE_VEL,
            this, 2000, 247, "finish.png", 1.5);
        
        this.NUM_LIVES = 3;
    }

    checkCollisions() {
        for(let i = this.PASSED_OBSTACLES; i < this.NUM_OBSTACLES; i++){
            if (this.boarder.isCollidedWith(this.obstacles[i])) {
                this.die();
            }
        }

        if (this.boarder.options.pos[0] < 0 || this.boarder.options.pos[0] > 1300){
            this.die();
        }
        return false;
    }

    checkWrap(obj) {
        if (this.isOutofBounds([obj.options.pos[0], obj.options.pos[1]])) {
            if (obj.isWrappable) {
                obj.options.pos[1] = this.DIM_Y;
            } else {
                // this.obstacles.shift();
                // this.NUM_OBSTACLES--;
                this.PASSED_OBSTACLES++;
            }
        }
    }

    die(){
        this.boarder.image.src = "flip-penguin.png";
        this.boarder.options.vel[1] =  this.OBSTACLE_VEL[1] * (-3);
    }

    draw(ctx){

        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        if (this.PASSED_OBSTACLES >= this.MAX_OBSTACLES) {
            this.finishLine.draw(ctx);
        }
        this.fences.forEach(fence => fence.draw(ctx));
        this.boarder.draw(ctx);
       
        for (let i = this.PASSED_OBSTACLES; i < this.NUM_OBSTACLES; i++) {
            this.obstacles[i].draw(ctx);
        }
        
        
        
    }

    isOutofBounds(pos) {
        return pos[0] < 0 || pos[0] > this.DIM_X || pos[1] + this.PADDING < 0 || pos[1] > this.DIM_Y;
    }

    generateObstacle(){
        if(this.PASSED_OBSTACLES < this.MAX_OBSTACLES && 
            (this.obstacles[this.NUM_OBSTACLES - 1].options.pos[1] <= 600 + 5 * this.level)){
            
            const randObstacle = (Math.random()  * 2 >= 1) ? new Sprite(
                [this.randXPos(), 800], this.OBSTACLE_VEL, this, 600, 300, "tree3.png", 2) :
                new Sprite(
                [this.randXPos(), 800], this.OBSTACLE_VEL, this, 512, 512, "rock.png", 2);
            this.obstacles.push(randObstacle);
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
        if(this.PASSED_OBSTACLES >= this.MAX_OBSTACLES){
            this.finishLine.move();
        }

        this.boarder.move();

        for (let i = this.PASSED_OBSTACLES; i < this.NUM_OBSTACLES; i++) {
                this.obstacles[i].move();
                this.checkWrap(this.obstacles[i]);
        }
    }

    randXPos(){
        let xVal = 0;
        while (xVal < this.PADDING - 100 || xVal > this.DIM_X - this.PADDING - 100) {
                xVal = Math.floor(Math.random() * this.DIM_X);
        }
        return xVal;
    }

    restart(){
        this.boarder.image.src = "penguin2.png";
        this.boarder.options.pos = [this.DIM_X / 2, 100];
        this.boarder.options.vel = [0,0];
        this.finishLine.options.pos[1] = 1000;


        this.obstacles = [this.dummy];
        this.PASSED_OBSTACLES = 0;
        this.NUM_OBSTACLES = 1;
        // this.step();
    }

    step() {
        // level over cond
        if (this.finishLine.options.pos[1] < this.boarder.options.pos[1] - 300) { // win condition
            if(this.boarder.options.vel[1] == 0){ //level passed cond
                this.level++;
                this.OBSTACLE_VEL[1]--;
                this.restart();
                return false;
            }
            else{ // level failed
                this.NUM_LIVES--;
                if (this.NUM_LIVES > 0) {
                    this.restart();
                    return false;
                } else {
                    return true; // game over cond
                }
            }
        }
        else{ // play on
            this.generateObstacle();
            this.move();
            return false;
        }
    }
}

export default Game;