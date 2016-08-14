'use strict'

var Transports = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	this.plane = game.add.sprite(game.world.width*7/8-90, game.world.centerY+100, 'plane');
	this.plane.scale.setTo(0.09, 0.09);
	this.plane.anchor.setTo(0.5, 0.5);
	
	// Plane can carry 2 units; 
	// No water and shelter;
	this.plane.storage = 2;
	this.plane.food = 0;
	// this.plane.water = 0;
	this.plane.medicine = 0;
	// this.plane.shelter = 0;

	this.truck = game.add.sprite(game.world.width*7/8-90, game.world.centerY+160, 'truck');
	this.truck.scale.setTo(0.08, 0.08);
	this.truck.anchor.setTo(0.5, 0.5);
	
	// Convoy can carry 5 units;
	this.truck.storage = 5;
	this.truck.food = 0;
	this.truck.water = 0;
	this.truck.medicine = 0;
	this.truck.shelter = 0;
	
	this.porter = game.add.sprite(game.world.width*7/8-90, game.world.centerY+220, 'porter');
	this.porter.scale.setTo(0.15, 0.15);
	this.porter.anchor.setTo(0.5, 0.5);

	// Porters can carry 5 units;
	this.porter.storage = 5;
	this.porter.food = 0;
	this.porter.water = 0;
	this.porter.medicine = 0;
	this.porter.shelter = 0;

	// Convoy takes 20 seconds, plane 5 seconds, porters 30 seconds to the camp;
	this.sendPlane = function () {
		// Tween the plane;
		game.add.tween(this.plane).to({x: [game.world.width/2, game.world.width/8], y: [game.world.centerY-50, game.world.centerY+70]}, 5000, Phaser.Easing.Quadratic.InOut, true, 0);

	};

	this.sendConvoy = function () {
		// Tween the truck;
		var tween = game.add.tween(this.truck);
		tween.to({x: game.world.width/8}, 20000, 'Linear', true, 0);
	};

	this.sendPorters = function () {
		// Tween the porters;
		game.add.tween(this.porter).to({x: game.world.width/8}, 30000, 'Linear', true, 0);
	};
};


Transports.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Transports;