import Game from './game.js';

class GameView{
    constructor(ctx, game){
        this.game = game;
        this.ctx = ctx;
    }

    moveDraw() {
        this.game.draw(this.ctx);
        this.game.step();
    }

    start() {
        this.bindKeyHandlers();
        setInterval(this.moveDraw.bind(this), 20);
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