class GameView{
    constructor(ctx, game, menu, score){
        this.game = game;
        this.ctx = ctx;
        this.menu = menu;
        this.score = score;
        this.move = 0;
    }

    moveDraw() {
        if(this.game.gameOver()){
            this.game.draw(this.ctx);
            this.game.step();
            clearInterval(this.move);
            this.menu.childNodes[3].innerHTML = "Your Score: ".concat(this.game.getScore());
            this.menu.style.display = "flex";
        }else{
            this.game.draw(this.ctx);
            this.game.step();
            this.score.innerHTML = this.game.getScore();
        }
    }

    start() {
        this.bindKeyHandlers();
        this.move = setInterval(this.moveDraw.bind(this), 20);
    }

    bindKeyHandlers () {
        document.addEventListener("keydown", (e) =>{
            const keyCode = e.which;
            // left arrow or 'a' key
            if(keyCode == 39 || keyCode == 83){
                this.game.boarder.power(0, 50);
            // right arrow or 's' key
            }else if(e.which == 37 || keyCode == 65){
                this.game.boarder.power(0, -50);
            }
        });
    }
}

export default GameView;