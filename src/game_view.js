class GameView{
    constructor(ctx, game, gameOverMenu, pauseMenu, score){
        this.game = game;
        this.ctx = ctx;
        this.gameOverMenu = gameOverMenu;
        this.pauseMenu = pauseMenu;
        this.score = score;
        this.move = 0;
        this.pauseCount = 0;
    }

    moveDraw() {
        if(this.game.gameOver()){
            this.game.draw(this.ctx);
            this.game.step();
            clearInterval(this.move);
            this.gameOverMenu.childNodes[3].innerHTML = "Your Score: ".concat(this.game.getScore());
            this.gameOverMenu.style.display = "flex";
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

            switch(keyCode){
                case 39 || 83:  // left arrow or 'a' key moves left
                    this.game.boarder.power(50);
                    break;
        
                case 37 || 65: // right arrow or 's' key moves right
                    this.game.boarder.power(-50);
                    break;
                
                case 32: //spacebar to pause -- unpause
                    if(this.pauseCount == 0){
                        this.pauseCount++;
                        clearInterval(this.move);
                        this.pauseMenu.style.display = "flex";
                    }
                    else{
                        this.pauseMenu.style.display = "none";
                        this.move = setInterval(this.moveDraw.bind(this), 20);
                        this.pauseCount = 0;
                    }
                    break;
            }   
        });
    }
}

export default GameView;