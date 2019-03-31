class MovingObject{
    constructor(options){
        this.options = options;
    }

    draw(ctx) {
//        this.options.pos = this.options.game.wrap(this.options.pos);
        ctx.beginPath();
        ctx.arc(this.options.pos[0], this.options.pos[1],
            this.options.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.options.color;
        ctx.fill();
    };

    move(){
        this.options.pos[0] += this.options.vel[0];
        this.options.pos[1] += this.options.vel[1];
    }
}

export default MovingObject;