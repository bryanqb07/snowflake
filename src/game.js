import MovingObject from './moving_object';
import Boarder from './boarder';
import Fence from './fence';


class Game{
    constructor(width, height) {
        // this.PADDING = 50;
        this.DIM_X = width;
        this.DIM_Y = height;
        this.boarder = new Boarder([this.DIM_X / 2, 100], this);
        this.testObstacle = new MovingObject({
            pos: [500, 500],
            vel: [0, -1],
            radius: 20,
            color: "#00FF00"
        });
        this.obstacles = [];
        this.NUM_OBSTACLES = 3;
        this.fences = [];
        this.makeFences(0);
        this.makeFences(this.DIM_X - this.fences[0].width);
//        this.leftFence = new Fence([0,this.DIM_Y], this);

        // {
        //     pos: [30, 30], vel: [1, 1],
        //     radius: 20, color: "#00FF00"
        // });

        // this.NUM_ASTEROIDS = 1;
        // this.asteroids = [];
        // this.addAsteroids();
        // this.ship = new Ship(this.randomPosition(), this);
        // this.bullets = [];
        // this.NUM_BULLETS = this.bullets.length;
    }

    draw(ctx){
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        this.fences.forEach(fence => fence.draw(ctx));
        this.boarder.draw(ctx);
        this.testObstacle.draw(ctx);
    }

    move(){
        this.fences.forEach(fence => {
            fence.move();
            this.checkWrap(fence);
        });
        this.boarder.move();
        this.testObstacle.move();
    }

    step(){
        this.move();
    }

    makeFences(shift){
        for(let i = 0; i < 7000; i+=50){
            const fence = new Fence([shift, this.DIM_Y - i], this);
            this.fences.push(fence);
        }
    }

    isOutofBounds(pos){
        return pos[0] < 0 || pos[0] > this.DIM_X || pos[1] < 0 || pos[1] > this.DIM_Y;
    }

    checkWrap(fence){
        if(this.isOutofBounds([fence.options.pos[0], fence.options.pos[1]])){
            fence.options.pos[1] = this.DIM_Y;
        }
    }

    // addObstacles(){

    // }



}

export default Game;