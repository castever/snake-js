define(function(require) {

    var objects = require('./objects');
    var Snake = require('./snake').Snake;
    var Canvas = objects.Canvas;
    var Block = objects.Block;
    var Stats = objects.Stats;
    var KeyboardController = require('./controller');

    /*
		the game
	*/
    function Game(canvas_id, stats_id) {
        var self = this;
        self.canvas_id = canvas_id;
        self.stats_id = stats_id;

        self.init();
    };

    //initialize the game
    Game.prototype.init = function() {
        console.log('initializing the game');
        var self = this;
        //create the canvas object from the given id
        self.canvas = new Canvas(self.canvas_id);
        self.stats = new Stats(self.stats_id);
        self.controller = new KeyboardController();

        self.canvas.canvas_el.addEventListener("mousedown", self.handleClick.bind(self), false);
    };


    Game.prototype.handleClick = function(e) {
        var self = this;
        self.endGame();
        self.start();
        return false;
    };

    //start the game
    Game.prototype.start = function() {
        console.log('starting the game');
        var self = this;

        //create a snake for the player
        self.snake = new Snake(5);
        self.food = self.createFood();
        self.score = 0;
        self.high_score = window.localStorage.getItem('high_score') || 0;

        self.canvas.canvasRequestsReset = false;
        self.paused = false;
        //start rendering the game
        self.loop();
    };

    Game.prototype.loop = function(tFrame) {
        var self = this;
        window.requestAnimationFrame(self.render.bind(self));
    };


    //the render loop of the game
    //runs using requestAnimationFrame
    Game.prototype.render = function(tFrame) {
        var self = this;

        //bind the Game as this to the render method
        //otherwise it will be window because of requestAnimationFrame
        self.loop_handle = requestAnimationFrame(self.render.bind(self));

        if (self.controller.isSpaceDown()) {
            self.paused = !self.paused;
        }

        if (self.paused) return;

        self.stats.setScore(self.score, self.high_score);

        var ctx = self.canvas.context;

        var w = self.canvas.width;
        var h = self.canvas.height;

        //paint the canvas every frame to refresh the snake and food        
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);


        //render the objects
        self.snake.render(ctx);
        self.food.render(ctx);

        //update the objects
        var direction = '';
        if (self.controller.isRightDown()) direction = 'right';
        else if (self.controller.isLeftDown()) direction = 'left';
        else if (self.controller.isUpDown()) direction = 'up';
        else if (self.controller.isDownDown()) direction = 'down';

        self.snake.update(direction);

        if (self.snake.collidesWith([self.food])) {
            self.snake.grow();
            self.food = self.createFood();
            self.score++;
        }

        var head = self.snake.getHead();
        if (head.x < 0 || head.x > w / head.size || head.y < 0 || head.y > h / head.size || self.snake.collidesWithSelf()) {
            //game over
            self.endGame();
            return;
        }
    };

    Game.prototype.endGame = function() {
    	var self = this;
        cancelAnimationFrame(self.loop_handle);        
        if(self.high_score < self.score) {
        	 window.localStorage.setItem('high_score', self.score);
        }
    }

    /*
		create a food block randomly in the game
		keep it away from the snake
		and the walls
    */
    Game.prototype.createFood = function() {
        var self = this;

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        var h = self.canvas.height;
        var w = self.canvas.width;

        var food = new Block(
            //keep the food away from the wall
            getRandomInt((w / 10) - 3, 3),
            getRandomInt((h / 10) - 3, 3),
            10,
            'green'
        );

        //don't let the food be near the head
        var head = self.snake.getHead();
        if (food.collidesWith(self.snake.blocks) || head.x == food.x + 1 || head.x == food.x - 1 || head.y == food.y + 1 || head.y == food.y - 1) {
            return self.createFood();
        }

        return food;
    };

    return {
        Game: Game
    };
});
