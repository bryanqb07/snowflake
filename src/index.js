import GameView from './game_view';
import Game from './game';

document.addEventListener("DOMContentLoaded", function (event) {
    const body = document.getElementsByTagName("BODY")[0];
    const startMenu = document.getElementById('start-menu');
    const pauseMenu = document.getElementById('pause-menu');
    const gameOverMenu = document.getElementById('gameover-menu');
    const button = document.querySelectorAll('.game-button');
    const canvas = document.getElementById('game-canvas');
    const score = document.getElementById('score');

    canvas.height = 800;
    canvas.width = 1400;
    const ctx =  canvas.getContext('2d');
    

    for(let i = 0; i < button.length; i++){
        button[i].addEventListener("click", (e) => {
            const testGame = new Game(canvas.width, canvas.height);
            const testGameView = new GameView(ctx, testGame, gameOverMenu, pauseMenu, score);
            
            body.style.backgroundColor = 'white';
            startMenu.style.display = 'none';
            gameOverMenu.style.display = 'none';
            testGameView.start();
        });
    }

    

});