import Sprite from './sprite';
import specs from './specs'; // contains specs for all objects

class Game{
    constructor(width, height) {
        // core game logic vars

        this.PADDING = 150;
        this.DIM_X = width;
        this.DIM_Y = height;

        this.START_Y = 800;
        this.OBSTACLE_VEL = [0, -5];

        this.FENCE_SPACER = 80;
        this.FENCE_WIDTH = 50;
        this.MAX_FENCES = 12;

        this.NUM_OBSTACLES = 1;
        this.MAX_OBSTACLES = 10;
        this.PASSED_OBSTACLES = 0;

        this.NUM_LIVES = 1;
        this.level = 1;
        this.score = 0;
        this.gameOv = false;

        /////

        // Object specs
        // this.offsets = {
        //     fence: [0, 0],
        //     finish: [0, 0],
        //     lives: [0, 0],
        //     penguin: [0, 0],
        //     rock: [-208, 72],
        //     tree: [-130, 60]
        // };

        // this.dims = { //dimensions
        //     fence: [634, 618, 12], // width height shrinkFactor
        //     finish: [2000, 247, 1.5],
        //     lives: [300, 300, 10],
        //     penguin: [448, 480, 5],
        //     rock: [512, 512, 2], 
        //     tree: [600, 300, 1]
        // };

        // this.srcs = {
        //     fence: "images/flag.png",
        //     finish: "images/finish.png",
        //     die: "images/flip-penguin.png",
        //     lives: "images/penguin_face.png",
        //     penguin: "images/penguin2.png", 
        //     rock: "images/rock.png",
        //     tree: "images/tree3.png"
        // };

        /////

        /// Create core objects
        // Sprite(position, velocity, game, dimensions, imgsrc, offsets)

        this.boarder = new Sprite(
            [this.DIM_X / 2, 100], [0,0], this, specs.dims.penguin, 
            specs.srcs.penguin, specs.offsets.penguin);

        this.fences = [];

        this.makeFences(0);
        this.makeFences(this.DIM_X - this.FENCE_WIDTH);


        this.firstObstacle = new Sprite(
            [500, 600], this.OBSTACLE_VEL, this, specs.dims.tree, 
            specs.srcs.tree, specs.offsets.tree);
        
        // this.testRock = new Sprite([500, 800], this.OBSTACLE_VEL, this, 
        //     this.dims.rock, this.srcs.rock, this.offsets.rock);

        this.obstacles = [this.firstObstacle];

        this.finishLine = new Sprite([this.FENCE_WIDTH - 25, 1000], this.OBSTACLE_VEL,
            this, specs.dims.finish, specs.srcs.finish, specs.offsets.finish);
        
        this.lives = []; // represents # of lives
        this.makeLives();
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
        this.boarder.image.src = specs.srcs.die;
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
            this.lives[i].draw(ctx);
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
            
            //generate tree if random num >= 1, rock otherwise
            const randObstacle = (Math.random()  * 2 >= 1) ? new Sprite(
                [this.randXPos(), this.START_Y], this.OBSTACLE_VEL, this, specs.dims.tree, 
                specs.srcs.tree, specs.offsets.tree) :
                new Sprite(
                [this.randXPos(), this.START_Y], this.OBSTACLE_VEL, this, specs.dims.rock,
                 specs.srcs.rock, specs.offsets.rock);

            this.obstacles.push(randObstacle);
            this.NUM_OBSTACLES++;
        }
    }

    makeFences(shift){
        for(let i = 0; i < this.FENCE_SPACER * this.MAX_FENCES; i += this.FENCE_SPACER){
            this.fences.push(new Sprite([shift, this.DIM_Y - i], this.OBSTACLE_VEL, this,
                specs.dims.fence, specs.srcs.fence, specs.offsets.fence, true));
        }
    }

    makeLives() {
        for (let i = 0; i < this.NUM_LIVES; i++) {
            this.lives.push(new Sprite([50 + i * 30, 25], [0, 0], this,
                specs.dims.lives, specs.srcs.lives, specs.offsets.lives, false));
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
        this.boarder.image.src = specs.srcs.penguin;
        this.boarder.options.pos = [this.DIM_X / 2, 100];
        this.boarder.options.vel = [0,0];
        this.finishLine.options.pos[1] = 1000;
        this.firstObstacle.options.pos = [500, 600]; 
        this.obstacles = [this.firstObstacle];
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
                this.lives.pop();
                if (this.NUM_LIVES > 0) {
                    this.restart(); // try again if lives left
                } else {
                   this.gameOv = true; // game over cond
                }
            }
        }
        else{ // play on
            // console.log("passed: ", this.PASSED_OBSTACLES);
            // console.log("max : ", this.MAX_OBSTACLES);
            this.score += this.level;
            this.generateObstacle();
            this.move();
            this.checkCollisions();
        }
    }
}

export default Game;