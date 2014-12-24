define(function(require) {

    var _
    var Game = require('./game').Game;

    var game = new Game("snake_game", "game_stats");
    game.showStartScreen();
});
