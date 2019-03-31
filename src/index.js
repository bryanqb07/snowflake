import MovingObject from './moving_object';
window.movingObject = MovingObject;

import GameView from './game_view';
window.GameView = GameView;

import Game from './game';

document.addEventListener("DOMContentLoaded", function (event) {
    var canvas = document.getElementById('game-canvas');
    canvas.height = 800;
    canvas.width = 1400;
    var ctx =  canvas.getContext('2d');

    // var test = new MovingObject({ pos: [30, 30], vel: [10, 10], 
    // radius: 20, color: "#00FF00" });

    // test.draw(ctx);

    const testGame = new Game(canvas.width, canvas.height);

    const testGameView = new GameView(ctx, testGame);

    testGameView.start();

});