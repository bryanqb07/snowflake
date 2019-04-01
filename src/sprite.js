import MovingObject from './moving_object';

class Sprite extends MovingObject {
    constructor(position, velocity, game, width, height, src, shrink, wrappable=false) {
        super({
            pos: position,
            vel: velocity,
            game: game
        });
        this.width = width;//267;
        this.height = height; //189;
        this.image = new Image();
        this.image.src = src;
        this.shrinkFactor = shrink;
        this.trueWidth = this.width / this.shrinkFactor;
        this.trueHeight = this.height / this.shrinkFactor;
        this.isWrappable = wrappable;
        // this.offSets = {
        //     tree: []
        // }
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
            this.width / this.shrinkFactor,
            this.height / this.shrinkFactor
        );
    }

    power(idx, impulse) {
        this.options.pos[idx] += impulse;
    }

    isCollidedWith(otherObject){
        const dx = this.options.pos[0] - otherObject.options.pos[0];
    
        const dy = Math.abs( (this.options.pos[1] - (otherObject.options.pos[1] + otherObject.trueHeight / 2)));
        return dy <= 5 && ((dx >= 0 && dx < 165) || (dx <= 0 && dx > -30));
    }


}

export default Sprite;