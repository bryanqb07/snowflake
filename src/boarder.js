import Sprite from './sprite';

class Boarder extends MovingObject{
    constructor(position, game){
        super({
            pos: position,
            vel: [0, 0],
            game: game
        });
        this.width = 267;
        this.height = 189;
        this.image = new Image();
        this.image.src = "penguin.png";
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.height,
            this.options.pos[0],
            this.options.pos[1],
            this.width / 2,
            this.height / 2
        );
    }

    power(idx, impulse){
        this.options.pos[idx] += impulse;
    }

    // jump(impulse){
    //     this.options.pos[1] += impulse;
    // }
}

export default Boarder;