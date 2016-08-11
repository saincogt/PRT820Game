'use strict'

var Transports = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	var truck = game.add.sprite(game.world.width*7/8-180, game.world.centerY+100, 'truck');
	truck.scale.setTo(0.07, 0.07);
	truck.anchor.setTo(0.5, 0.5);


	var plane = game.add.sprite(game.world.width*7/8-180, game.world.centerY+50, 'plane');
	plane.scale.setTo(0.1, 0.1);
	plane.anchor.setTo(0.5, 0.5);

	this.showOptions = function () {
		var tween = game.add.tween(truck);
		tween.to({x: game.world.width/8}, 20000, 'Linear', true, 0);
		game.add.tween(plane).to({x: [game.world.width/2, game.world.width/8], y: [game.world.centerY-50, game.world.centerY+70]}, 5000, Phaser.Easing.Quadratic.InOut, true, 0);

	};
};

Transports.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Transports;