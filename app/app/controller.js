define(function(require) {

	var _ = require('underscore');

    function KeyboardController() {
    	var self = this;
    	var valid_keys = [37,38,39,40,32];//up,down,left,right,space
        self.keysDown = {};


        window.addEventListener("keydown", function(e) {
        	var key = e.keyCode;
        	console.log("down:" + key);
        	if(!isValidKey(key)) return;
        	e.stopPropagation();
        	e.preventDefault();
            self.keysDown[e.keyCode] = true;
        }, false);

        window.addEventListener("keyup", function(e) {
        	var key = e.keyCode;
        	console.log("up:" + key);
        	if(!isValidKey(key)) return;
        	e.stopPropagation();
        	e.preventDefault();
            delete self.keysDown[e.keyCode];
        }, false);

        function isValidKey(key) {
        	return _.indexOf(valid_keys, key) != -1;
        };
    };

    KeyboardController.prototype.keyIsDown = function(key) {
    	return _.has(this.keysDown, key);
    }

    KeyboardController.prototype.isRightDown = function() {
    	return this.keyIsDown(39);
    }    	

    KeyboardController.prototype.isLeftDown = function() {
    	return this.keyIsDown(37);
    };

    KeyboardController.prototype.isUpDown = function() {
    	return this.keyIsDown(38);
    };

    KeyboardController.prototype.isDownDown = function() {
    	return this.keyIsDown(40);
    };

    KeyboardController.prototype.isSpaceDown = function() {
    	return this.keyIsDown(32);
    };

    return KeyboardController;

});
