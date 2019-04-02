import MovingObject from './moving_object';

class Sprite extends MovingObject {
    constructor(position, velocity, game, dims, src, offset, wrappable=false) {
        super({
            pos: position,
            vel: velocity,
            game: game
        });
        //dims = array[width, height, shrink]
        this.width = dims[0];
        this.height = dims[1]; 
        this.shrinkFactor = dims[2];
        this.image = new Image();
        this.image.src = src;
        this.trueWidth = this.width / this.shrinkFactor;
        this.trueHeight = this.height / this.shrinkFactor;
        this.offset = offset;
        this.isWrappable = wrappable;
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
            this.trueWidth,
            this.trueHeight
        );
    }

    power(impulse) {
        this.options.pos[0] += impulse;
    }

    isCollidedWith(otherObject){

        
        const dx = this.options.pos[0] - otherObject.options.pos[0] - otherObject.trueWidth / 2;
        // console.log("boarder truewidth: ", this.trueWidth);
        // console.log("boarder x pos: ", this.options.pos[0]);
        // console.log("obj truewidth: ", otherObject.trueWidth);
        // console.log("obj x pos: ", this.options.pos[0]);
        // console.log(dx);
        
        // pictures widths vary by obstacle -- so we need to account for offset


        const dy = Math.abs( (this.options.pos[1] - (otherObject.options.pos[1] + otherObject.trueHeight / 2)));
        
        return dy <= Math.abs(otherObject.options.vel[1]) && (dx <= 0 && dx > otherObject.offset[0] || dx > 0 && dx < otherObject.offset[1]); 
        
    }
}

export default Sprite;