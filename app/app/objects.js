define(function(require) {

    /*
		creates a html 5 canvas object from 
		the given canvas object id
	*/
    function Canvas(id) {
        var self = this;
        self.canvas_el = document.getElementById(id);
        self.context = self.canvas_el.getContext('2d');
        self.width = self.canvas_el.width;
        self.height = self.canvas_el.height;
        
    };

    /*
		game stats
    */
    function Stats(id) {
    	var self = this;
    	self.stats_el = document.getElementById(id);
    	self.score_el = self.stats_el.querySelector('#score');
    	self.high_score_el = self.stats_el.querySelector('#highscore');
    };

    Stats.prototype.setScore = function(score, high_score) {
    	var self = this;
    	self.score_el.textContent = "" + score;
    	self.high_score_el.textContent = "" + high_score;
    };

    function Audio(id, volume) {
        var self = this;
        self.audio_el = document.getElementById(id);
        self.audio_el.volume = volume || 0.1;
    };

    Audio.prototype.play = function() {
        var self = this;
        self.audio_el.play();
    };

    Audio.prototype.reset = function() {
        var self = this;
        self.audio_el.currentTime = 0;
    };

    Audio.prototype.stop = function() {
        var self = this;
        self.audio_el.pause();
    };

    /**
		the basic building block for snakes and food
    */
    function Block(x, y, size, color) {
        var self = this;
        self.x = x || 0;
        self.y = y || 0;
        self.size = size || 10;
        self.color = color || 'blue';
    };

    /**
		render the block using the context
    */
    Block.prototype.render = function(context) {
        var self = this;
        var x = self.x;
        var y = self.y;
        var size = self.size;
        context.fillStyle = self.color;
        context.fillRect(x * size, y * size, size, size);
        // context.strokeStyle = self.color;
        // context.strokeRect(x * size, y * size, size, size);
    };

    Block.prototype.collidesWith = function(toCheck) {
        var self = this;

        for (var i = 0, c = toCheck.length; i < c; i++) {
            var b = toCheck[i];
            if (b.x == self.x && b.y == self.y)
                return true
        }
        return false;
    };

    return {
        Block: Block,
        Canvas: Canvas,
        Stats: Stats,
        Audio: Audio
    };
});
