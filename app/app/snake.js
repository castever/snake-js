define(function(require) {
    var _ = require('underscore');
    var Block = require('./objects').Block;
    /**
    		this is the Snake object
    		it is simply an array of Blocks
    		with some methods that make it a snake
    		move, eat, die
        */
    function Snake(length) {
        var self = this;
        //the initial length of the snake
        self.length = length || 5;
        self.speed = 90;
        self.direction = 'right';
        //the array of blocks that represent the snake
        self.blocks = [];

        //create the initial snake
        //horizontal from the top left
        //the tail is in the top left corner
        var count = self.length - 1;
        while (count >= 0) {
            self.blocks.push(new Block(count, 0))
            count--;
        }
    };

    /**
    	render the snake to the context
    */
    Snake.prototype.render = function(context) {
        var self = this;
        _.each(self.blocks, function(block) {
            block.render(context);
        });
    };

    Snake.prototype.getHead = function() {
        var self = this;
        return _.first(self.blocks);
    }

    Snake.prototype.getTail = function() {
        var self = this;
        return _.last(self.blocks);
    }

    /**
		animate the snake; move it
		the snake always moves forward
		to achieve this we pop the tail off and put it at the head
    */
    Snake.prototype.update = function(direction) {
        var self = this;

        //pacing for speed
        if(performance) {
            self.time = performance.now();
        } else {
            self.time = Date.now();
        }
        
        self.elapsedTime += self.time - (self.then || self.time);
        self.then = self.time;
        if (self.elapsedTime < self.speed) {
            return;
        }
        self.elapsedTime = 0;

        if (direction == 'right' && self.direction != 'left') self.direction = 'right';
        if (direction == 'up' && self.direction != 'down') self.direction = 'up';
        if (direction == 'left' && self.direction != 'right') self.direction = 'left';
        if (direction == 'down' && self.direction != 'up') self.direction = 'down';

        var head = self.blocks[0];
        var nextX = head.x;
        var nextY = head.y;

        if (self.direction == "right") nextX++;
        else if (self.direction == "left") nextX--;
        else if (self.direction == "up") nextY--;
        else if (self.direction == "down") nextY++;

        var tail = self.blocks.pop();
        tail.x = nextX;
        tail.y = nextY;

        self.blocks.unshift(tail);
    };

    Snake.prototype.collidesWith = function(toCheck) {
        var self = this;
        var head = self.getHead();
		return  head.collidesWith(toCheck);
    };

    Snake.prototype.collidesWithSelf = function() {
    	var self = this;
    	return self.collidesWith(_.rest(self.blocks));
    };

    Snake.prototype.grow = function() {
        var self = this;

        //increase the speed
        self.speed -= 1;
        if (self.speed < 15) self.speed = 15;
        console.log(self.speed);


        //add a tail
        var current_tail = self.getTail();

        var new_tail = new Block(current_tail.x, current_tail.y);
        if (self.direction == "right") new_tail.x++;
        else if (self.direction == "left") new_tail.x--;
        else if (self.direction == "up") new_tail.y--;
        else if (self.direction == "down") new_tail.y++;

        self.blocks.push(new_tail);
    }

    return {
        Snake: Snake
    };

});
