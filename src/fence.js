import MovingObject from './moving_object';

class Fence extends MovingObject{
    constructor(position, game){
        super({
            pos: position,
            color: "#32cd32",
            vel: [0, -5],
            game: game
        });
        this.width = 20;
        this.height = 10;
    }

    draw(ctx){
        ctx.beginPath();
        // ctx.rect(0, 0, 0, 50);
        // ctx.fillStyle = 'black';
        // ctx.fill(); 

        ctx.rect(this.options.pos[0], this.options.pos[1], this.width, this.height);
        ctx.fillStyle = "red";
        ctx.fill();


    }
}

export default Fence;