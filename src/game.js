import Sprite from './sprite';

class Game{
    constructor(width, height) {
        this.PADDING = 150;
        this.DIM_X = width;
        this.DIM_Y = height;

        this.offsets = {
            boarder: [0, 0],
            tree: [-130, 60],
            rock: [-208, 72]
        };

        this.boarder = new Sprite(
            [this.DIM_X / 2, 100], [0,0], this, 448, 480, "images/penguin2.png", 5, [0,0]);
        //this.testRock = new Sprite([500, 800], [0, -5], this, 900, 900, "tree.png", 4);
        
        this.level = 1;

        this.OBSTACLE_VEL = [0, -5];
        
        this.fences = [];
        this.FENCE_SPACER = 80;
        this.FENCE_WIDTH = 50;
        this.MAX_FENCES = 12;
        this.makeFences(0);
        this.makeFences(this.DIM_X - this.FENCE_WIDTH);


        this.dummy = new Sprite(
            [500, 600], this.OBSTACLE_VEL, this, 600, 300, "images/tree3.png", [-130, 60] , 1);
        // //test
        // this.testRock = new Sprite(
        //     [500, 600], this.OBSTACLE_VEL, this, 512, 512, "images/rock.png", 2);
        // // //
        this.obstacles = [this.dummy];
        this.NUM_OBSTACLES = 1;
        this.MAX_OBSTACLES = 10;
        this.PASSED_OBSTACLES = 0;        
    
        this.finishLine = new Sprite([this.FENCE_WIDTH - 25, 1000], this.OBSTACLE_VEL,
            this, 2000, 247, "images/finish.png", 1.5, [0,0]);
        
        this.NUM_LIVES = 1;

        this.penguins = []; // represents # of lives
        this.makePenguins();

        this.score = 0;
        this.gameOv = false;
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
    }

    checkWrap(obj) {
        if (this.isOutofBounds([obj.options.pos[0], obj.options.pos[1]])) {
            if (obj.isWrappable) {
                obj.options.pos[1] = this.DIM_Y;
            } else {
                this.PASSED_OBSTACLES++;
            }
        }
    }

    die(){
        this.boarder.image.src = "images/flip-penguin.png";
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

        for(let i = 0; i < this.NUM_LIVES; i++){
            this.penguins[i].draw(ctx);
        }
    }

    isOutofBounds(pos) {
        return pos[0] < 0 || pos[0] > this.DIM_X || pos[1] + this.PADDING < 0 || pos[1] > this.DIM_Y;
    }

    gameOver(){
        return this.gameOv;
    }

    getScore(){
        return this.score;
    }

    generateObstacle(){
        if(this.PASSED_OBSTACLES < this.MAX_OBSTACLES && 
            (this.obstacles[this.NUM_OBSTACLES - 1].options.pos[1] <= 600 + (5 * this.level))){
            
            const randObstacle = (Math.random()  * 2 >= 1) ? new Sprite(
                [this.randXPos(), 800], this.OBSTACLE_VEL, this, 600, 300, "images/tree3.png", 1, [-130, 60]) :
                new Sprite(
                [this.randXPos(), 800], this.OBSTACLE_VEL, this, 512, 512, "images/rock.png", 2, [-208, 72]);
            this.obstacles.push(randObstacle);
            this.NUM_OBSTACLES++;
        }
    }

    makeFences(shift){
        for(let i = 0; i < this.FENCE_SPACER * this.MAX_FENCES; i += this.FENCE_SPACER){
            this.fences.push(new Sprite([shift, this.DIM_Y - i], this.OBSTACLE_VEL, this,
                634, 618, "images/flag.png", 12, [0,0], true));
        }
    }

    makePenguins() {
        for (let i = 0; i < this.NUM_LIVES; i++) {
            this.penguins.push(new Sprite([50 + i * 30, 25], [0, 0], this,
                300, 300, "images/penguin_face.png", 10, false));
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
        while (xVal <= 0 || xVal > this.DIM_X - this.PADDING - 150 - 20) {
                xVal = Math.floor(Math.random() * this.DIM_X - 20);
        }
        return xVal;
    }

    restart(){
        this.boarder.image.src = "images/penguin2.png";
        this.boarder.options.pos = [this.DIM_X / 2, 100];
        this.boarder.options.vel = [0,0];
        this.finishLine.options.pos[1] = 1000;
        this.dummy.options.pos = [500, 600]; 
        this.obstacles = [this.dummy];
        this.PASSED_OBSTACLES = 0;
        this.NUM_OBSTACLES = 1;
        this.MAX_OBSTACLES += (this.level * 5);
    }

    step() {
        // level over cond
        if (this.finishLine.options.pos[1] < this.boarder.options.pos[1] - 300) { 
            if(this.boarder.options.vel[1] == 0){ //level passed cond
                this.level++;
                this.OBSTACLE_VEL[1] -= 2;
                this.restart();
            }
            else{ // level failed cond
                this.NUM_LIVES--;
                this.penguins.pop();
                if (this.NUM_LIVES > 0) {
                    this.restart(); // try again if lives left
                } else {
                   this.gameOv = true; // game over cond
                }
            }
        }
        else{ // play on
            console.log("passed: ", this.PASSED_OBSTACLES);
            console.log("max : ", this.MAX_OBSTACLES);
            this.score += this.level;
            this.generateObstacle();
            this.move();
            this.checkCollisions();
        }
    }
}

export default Game;