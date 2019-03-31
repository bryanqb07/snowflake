import Game from './game.js';

class GameView{
    constructor(ctx, game){
        this.game = game;
        this.ctx = ctx;
        this.move = 0;
    }

    moveDraw() {
        if(this.game.checkCollisions()){
            clearInterval(this.move);
            this.move = 0;
        }else{
            // console.log(this.game.step());
            this.game.draw(this.ctx);
            this.game.step();
        }
    }

    start() {
        this.bindKeyHandlers();
        this.move = setInterval(this.moveDraw.bind(this), 20);
    }

    bindKeyHandlers () {
        // key('up', () => this.game.ship.power([0, -1]));
        // key('down', () => this.game.ship.power([0, 1]));
        key('right', () => this.game.boarder.power(0,50));
        key('left', () => this.game.boarder.power(0, -50));
        // key('up', () => {
        //     this.game.boarder.power(1, -15);
        //     this.game.boarder.power(1, 15);
        // });
    }
}


export default GameView;