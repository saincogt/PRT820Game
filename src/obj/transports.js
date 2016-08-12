'use strict'

var Transports = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	this.truck = game.add.sprite(game.world.width*7/8-180, game.world.centerY+100, 'truck');
	this.truck.scale.setTo(0.06, 0.06);
	this.truck.anchor.setTo(0.5, 0.5);


	this.plane = game.add.sprite(game.world.width*7/8-180, game.world.centerY+50, 'plane');
	this.plane.scale.setTo(0.07, 0.07);
	this.plane.anchor.setTo(0.5, 0.5);

	this.showOptions = function () {
		var tween = game.add.tween(this.truck);
		tween.to({x: game.world.width/8}, 20000, 'Linear', true, 0);
		game.add.tween(this.plane).to({x: [game.world.width/2, game.world.width/8], y: [game.world.centerY-50, game.world.centerY+70]}, 5000, Phaser.Easing.Quadratic.InOut, true, 0);

	};
};

Transports.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Transports;