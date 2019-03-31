import MovingObject from './moving_object';
window.movingObject = MovingObject;

import GameView from './game_view';
window.GameView = GameView;

import Game from './game';


document.addEventListener("DOMContentLoaded", function (event) {
    const body = document.getElementsByTagName("BODY")[0];
    const menu = document.getElementById('start-menu');
    const button = document.getElementById('start-button');
    const canvas = document.getElementById('game-canvas');
    canvas.height = 800;
    canvas.width = 1400;
    const ctx =  canvas.getContext('2d');

    const testGame = new Game(canvas.width, canvas.height);

    const testGameView = new GameView(ctx, testGame);

    button.addEventListener("click", (e) => {
        body.style.backgroundColor = 'white';
        menu.style.display = 'none';
        testGameView.start();
    });

});