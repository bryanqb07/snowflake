class GameView{
    constructor(ctx, game, menu){
        this.game = game;
        this.ctx = ctx;
        this.menu = menu;
        this.move = 0;
    }

    moveDraw() {
        if(this.game.gameOver()){
            clearInterval(this.move);
            // this.move = 0;
            // console.log(this.menu);
            this.menu.style.display = "flex";

        }else{
            // console.log(this.game.step());
            this.game.draw(this.ctx);
            this.game.step();
            this.game.gameOver(this.menu); //gameover check
            // if(this.game.NUM_LIVES == 0){
            //     this.menu.display = "flex";
            // }
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