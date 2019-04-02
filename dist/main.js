/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n/* harmony import */ var _specs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./specs */ \"./src/specs.js\");\n\n // contains parameter values for all objects\n\nclass Game{\n    constructor(width, height) {\n        // core game logic vars\n        this.PADDING = 150;\n        this.DIM_X = width;\n        this.DIM_Y = height;\n\n        this.START_Y = 800;\n        this.OBSTACLE_VEL = [0, -5];\n\n        this.FENCE_SPACER = 80;\n        this.FENCE_WIDTH = 50;\n        this.MAX_FENCES = 12;\n\n        this.NUM_OBSTACLES = 1;\n        this.MAX_OBSTACLES = 10;\n        this.PASSED_OBSTACLES = 0;\n\n        this.NUM_LIVES = 3;\n        this.level = 1;\n        this.score = 0;\n        this.gameOv = false;\n\n        //\n\n        /// Create core objects\n        // Sprite(position, velocity, game, dimensions, imgsrc, offsets)\n\n        this.boarder = new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n            [this.DIM_X / 2, 100], [0,0], this, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dims.penguin, \n            _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.penguin, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].offsets.penguin);\n\n        this.fences = [];\n\n        this.makeFences(0);\n        this.makeFences(this.DIM_X - this.FENCE_WIDTH);\n\n\n        this.firstObstacle = new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n            [500, 600], this.OBSTACLE_VEL, this, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dims.tree, \n            _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.tree, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].offsets.tree);\n        \n        // this.testRock = new Sprite([500, 800], this.OBSTACLE_VEL, this, \n        //     this.dims.rock, this.srcs.rock, this.offsets.rock);\n\n        this.obstacles = [this.firstObstacle];\n\n        this.finishLine = new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([this.FENCE_WIDTH - 25, 1000], this.OBSTACLE_VEL,\n            this, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dims.finish, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.finish, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].offsets.finish);\n        \n        this.lives = []; // represents # of lives\n        this.makeLives();\n    }\n\n    checkCollisions() {\n        for(let i = this.PASSED_OBSTACLES; i < this.NUM_OBSTACLES; i++){\n            if (this.boarder.isCollidedWith(this.obstacles[i])) {\n                this.die();\n            }\n        }\n\n        if (this.boarder.options.pos[0] < this.FENCE_WIDTH || \n            this.boarder.options.pos[0] > this.DIM_X - this.FENCE_WIDTH - 100){\n            this.die();\n        }\n    }\n\n    checkWrap(obj) {\n        if (this.isOutofBounds([obj.options.pos[0], obj.options.pos[1]])) {\n            if (obj.isWrappable) {\n                obj.options.pos[1] = this.DIM_Y;\n            } else {\n                this.PASSED_OBSTACLES++;\n            }\n        }\n    }\n\n    die(){\n        this.boarder.image.src = _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.die;\n        this.boarder.options.vel[1] =  this.OBSTACLE_VEL[1] * (-3);\n    }\n\n    draw(ctx){\n        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n\n        if (this.PASSED_OBSTACLES >= this.MAX_OBSTACLES) {\n            this.finishLine.draw(ctx);\n        }\n        this.fences.forEach(fence => fence.draw(ctx));\n        this.boarder.draw(ctx);\n       \n        for (let i = this.PASSED_OBSTACLES; i < this.NUM_OBSTACLES; i++) {\n            this.obstacles[i].draw(ctx);\n        }\n\n        for(let i = 0; i < this.NUM_LIVES; i++){\n            this.lives[i].draw(ctx);\n        }\n    }\n\n    isOutofBounds(pos) {\n        return pos[0] < 0 || pos[0] > this.DIM_X || pos[1] + this.PADDING < 0 || pos[1] > this.DIM_Y;\n    }\n\n    gameOver(){\n        return this.gameOv;\n    }\n\n    getScore(){\n        return this.score;\n    }\n\n    generateObstacle(){\n        if(this.PASSED_OBSTACLES < this.MAX_OBSTACLES && \n            (this.obstacles[this.NUM_OBSTACLES - 1].options.pos[1] <= 600 + (5 * this.level))){\n            \n            //generate tree if random num >= 1, rock otherwise\n            const randObstacle = (Math.random()  * 2 >= 1) ? new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n                [this.randXPos(), this.START_Y], this.OBSTACLE_VEL, this, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dims.tree, \n                _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.tree, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].offsets.tree) :\n                new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n                [this.randXPos(), this.START_Y], this.OBSTACLE_VEL, this, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dims.rock,\n                 _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.rock, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].offsets.rock);\n\n            this.obstacles.push(randObstacle);\n            this.NUM_OBSTACLES++;\n        }\n    }\n\n    makeFences(shift){\n        for(let i = 0; i < this.FENCE_SPACER * this.MAX_FENCES; i += this.FENCE_SPACER){\n            this.fences.push(new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([shift, this.DIM_Y - i], this.OBSTACLE_VEL, this,\n                _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dims.fence, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.fence, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].offsets.fence, true));\n        }\n    }\n\n    makeLives() {\n        for (let i = 0; i < this.NUM_LIVES; i++) {\n            this.lives.push(new _sprite__WEBPACK_IMPORTED_MODULE_0__[\"default\"]([50 + i * 30, 25], [0, 0], this,\n                _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].dims.lives, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.lives, _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].offsets.lives, false));\n        }\n    }\n\n    move() {\n        this.fences.forEach(fence => {\n            fence.move();\n            this.checkWrap(fence);\n        });\n        if(this.PASSED_OBSTACLES >= this.MAX_OBSTACLES){\n            this.finishLine.move();\n        }\n\n        this.boarder.move();\n\n        for (let i = this.PASSED_OBSTACLES; i < this.NUM_OBSTACLES; i++) {\n                this.obstacles[i].move();\n                this.checkWrap(this.obstacles[i]);\n        }\n    }\n\n    randXPos(){\n        let xVal = 0;\n        while (xVal <= 0 || xVal > this.DIM_X - this.PADDING - 150 - 20) {\n                xVal = Math.floor(Math.random() * this.DIM_X - 20);\n        }\n        return xVal;\n    }\n\n    restart(){\n        this.boarder.image.src = _specs__WEBPACK_IMPORTED_MODULE_1__[\"default\"].srcs.penguin;\n        this.boarder.options.pos = [this.DIM_X / 2, 100];\n        this.boarder.options.vel = [0,0];\n        this.finishLine.options.pos[1] = 1000;\n        this.firstObstacle.options.pos = [500, 600]; \n        this.obstacles = [this.firstObstacle];\n        this.PASSED_OBSTACLES = 0;\n        this.NUM_OBSTACLES = 1;\n        this.MAX_OBSTACLES += (this.level * 5);\n    }\n\n    step() {\n        // level over cond\n        if (this.finishLine.options.pos[1] < this.boarder.options.pos[1] - 300) { \n            if(this.boarder.options.vel[1] == 0){ //level passed cond\n                this.level++;\n                this.OBSTACLE_VEL[1] -= 2;\n                this.restart();\n            }\n            else{ // level failed cond\n                this.NUM_LIVES--;\n                this.lives.pop();\n                if (this.NUM_LIVES > 0) {\n                    this.restart(); // try again if lives left\n                } else {\n                   this.gameOv = true; // game over cond\n                }\n            }\n        }\n        else{ // play on\n            // console.log(\"passed: \", this.PASSED_OBSTACLES);\n            // console.log(\"max : \", this.MAX_OBSTACLES);\n            this.score += this.level;\n            this.generateObstacle();\n            this.move();\n            this.checkCollisions();\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameView{\n    constructor(ctx, game, gameOverMenu, pauseMenu, score){\n        this.game = game;\n        this.ctx = ctx;\n        this.gameOverMenu = gameOverMenu;\n        this.pauseMenu = pauseMenu;\n        this.score = score;\n        this.move = 0;\n        this.pauseCount = 0;\n    }\n\n    moveDraw() {\n        if(this.game.gameOver()){\n            this.game.draw(this.ctx);\n            this.game.step();\n            clearInterval(this.move);\n            this.gameOverMenu.childNodes[3].innerHTML = \"Your Score: \".concat(this.game.getScore());\n            this.gameOverMenu.style.display = \"flex\";\n        }else{\n            this.game.draw(this.ctx);\n            this.game.step();\n            this.score.innerHTML = this.game.getScore();\n        }\n    }\n\n    start() {\n        this.bindKeyHandlers();\n        this.move = setInterval(this.moveDraw.bind(this), 20);\n    }\n\n    bindKeyHandlers () {\n        document.addEventListener(\"keydown\", (e) =>{\n            const keyCode = e.which;\n\n            switch(keyCode){\n                case 39 || false:  // left arrow or 'a' key moves left\n                    this.game.boarder.power(50);\n                    break;\n        \n                case 37 || false: // right arrow or 's' key moves right\n                    this.game.boarder.power(-50);\n                    break;\n                \n                case 32: //spacebar to pause -- unpause\n                    if(this.pauseCount == 0){\n                        this.pauseCount++;\n                        clearInterval(this.move);\n                        this.pauseMenu.style.display = \"flex\";\n                    }\n                    else{\n                        this.pauseMenu.style.display = \"none\";\n                        this.move = setInterval(this.moveDraw.bind(this), 20);\n                        this.pauseCount = 0;\n                    }\n                    break;\n            }   \n        });\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function (event) {\n    const body = document.getElementsByTagName(\"BODY\")[0];\n    const startMenu = document.getElementById('start-menu');\n    const instructionMenu = document.getElementById('instruction-menu');\n    const pauseMenu = document.getElementById('pause-menu');\n    const gameOverMenu = document.getElementById('gameover-menu');\n    const button = document.querySelectorAll('.game-button');\n    const instructionButton = document.getElementById('instructions');\n    const canvas = document.getElementById('game-canvas');\n    const score = document.getElementById('score');\n    \n    canvas.height = 800;\n    canvas.width = 1400;\n    const ctx =  canvas.getContext('2d');\n    \n    for(let i = 0; i < button.length; i++){\n        button[i].addEventListener(\"click\", (e) => {\n            const testGame = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"](canvas.width, canvas.height);\n            const testGameView = new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, testGame, gameOverMenu, pauseMenu, score);\n            \n            body.style.backgroundColor = 'white';\n            startMenu.style.display = 'none';\n            instructionMenu.style.display = 'none';\n            gameOverMenu.style.display = 'none';\n            testGameView.start();\n        });\n    }\n\n    instructionButton.addEventListener(\"click\", (e) =>{\n        startMenu.style.display = 'none';\n        instructionMenu.style.display = 'flex';\n    });\n\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MovingObject{\n    constructor(options){\n        this.options = options;\n        this.isWrappable = true;\n    }\n\n    draw(ctx) {\n//        this.options.pos = this.options.game.wrap(this.options.pos);\n        // ctx.beginPath();\n        // ctx.arc(this.options.pos[0], this.options.pos[1],\n        //     this.options.radius, 0, 2 * Math.PI, false);\n        // ctx.fillStyle = this.options.color;\n        // ctx.fill();\n    }\n\n    move(){\n        this.options.pos[0] += this.options.vel[0];\n        this.options.pos[1] += this.options.vel[1];\n    }\n\n    \n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MovingObject);\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/specs.js":
/*!**********************!*\
  !*** ./src/specs.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst specs = {\n    offsets : {\n        fence: [0, 0],\n        finish: [0, 0],\n        lives: [0, 0],\n        penguin: [0, 0],\n        rock: [-208, 72],\n        tree: [-130, 60]\n    },\n\n    dims: { //dimensions\n        fence: [634, 618, 12], // width height shrinkFactor\n        finish: [2000, 247, 1.5],\n        lives: [300, 300, 10],\n        penguin: [448, 480, 5],\n        rock: [512, 512, 2],\n        tree: [600, 300, 1]\n    },\n\n    srcs : {\n        fence: \"images/flag.png\",\n        finish: \"images/finish.png\",\n        die: \"images/flip-penguin.png\",\n        lives: \"images/penguin_face.png\",\n        penguin: \"images/penguin2.png\",\n        rock: \"images/rock.png\",\n        tree: \"images/tree3.png\"\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (specs);\n\n//# sourceURL=webpack:///./src/specs.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\n\nclass Sprite extends _moving_object__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n    constructor(position, velocity, game, dims, src, offset, wrappable=false) {\n        super({\n            pos: position,\n            vel: velocity,\n            game: game\n        });\n        //dims = array[width, height, shrink]\n        this.width = dims[0];\n        this.height = dims[1]; \n        this.shrinkFactor = dims[2];\n        this.image = new Image();\n        this.image.src = src;\n        this.trueWidth = this.width / this.shrinkFactor;\n        this.trueHeight = this.height / this.shrinkFactor;\n        this.offset = offset;\n        this.isWrappable = wrappable;\n    }\n\n    draw(ctx) {\n        ctx.drawImage(\n            this.image,\n            0,\n            0,\n            this.width,\n            this.height,\n            this.options.pos[0],\n            this.options.pos[1],\n            this.trueWidth,\n            this.trueHeight\n        );\n    }\n\n    power(impulse) {\n        this.options.pos[0] += impulse;\n    }\n\n    isCollidedWith(otherObject){\n\n        \n        const dx = this.options.pos[0] - otherObject.options.pos[0] - otherObject.trueWidth / 2;\n        // console.log(\"boarder truewidth: \", this.trueWidth);\n        // console.log(\"boarder x pos: \", this.options.pos[0]);\n        // console.log(\"obj truewidth: \", otherObject.trueWidth);\n        // console.log(\"obj x pos: \", this.options.pos[0]);\n        // console.log(dx);\n        \n        // pictures widths vary by obstacle -- so we need to account for offset\n\n\n        const dy = Math.abs( (this.options.pos[1] - (otherObject.options.pos[1] + otherObject.trueHeight / 2)));\n        \n        return dy <= Math.abs(otherObject.options.vel[1]) && (dx <= 0 && dx > otherObject.offset[0] || dx > 0 && dx < otherObject.offset[1]); \n        \n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Sprite);\n\n//# sourceURL=webpack:///./src/sprite.js?");

/***/ })

/******/ });