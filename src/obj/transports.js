'use strict';
var Transports = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	var optionLocation = {
		x: game.world.width * 7 / 8 - 90,
		y: game.world.centerY + 100
	};

	var transName = ['plane', 'truck', 'porter'];
	var options = [];
	var group;

	this.name = 'transports';
	this.plane = {
		food: 100,
		medicine: 100,
		storage: 0,
		commute: 5,
		cooldown: 40
	};
	this.truck = {
		food: 0,
		water: 0,
		medicine: 0,
		shelter: 0,
		storage: 5,
		commute: 20
	};
	this.porter = {
		food: 0,
		water: 0,
		medicine: 0,
		shelter: 0,
		storage: 5,
		commute: 30,
		population: 1000
	};

	group = game.add.group();
	for (var i = 0; i < 3; i++) {
		options[i] = group.create(optionLocation.x, optionLocation.y + 60 * i, transName[i]);
		options[i].anchor.setTo(0.5, 0.5);
		options[i].scale.setTo(0.1, 0.1);
	}

	// Convoy takes 20 seconds, plane 5 seconds, porters 30 seconds to the camp;
	this.sendPlane = function () {
		// Tween the plane 5 seconds;
		var tween = game.add.tween(options[0]);
		tween.to({x: [game.world.width/2, game.world.width/8],
			y: [game.world.centerY-50, game.world.centerY+70]}, 500,
			Phaser.Easing.Quadratic.InOut, true, 0);
		tween.onComplete.add(this.PlaneOnComplete, this);
	};

	this.sendConvoy = function () {
		// Tween the truck 20 seconds;
		var tween = game.add.tween(options[1]);
		tween.to({x: game.world.width/8}, 2000, 'Linear', true, 0);
		tween.onComplete.add(this.ConvoyOnComplete, this);
	};

	this.sendPorters = function () {
		// Tween the porters; 30 seconds
		var tween = game.add.tween(options[2]).to({x: game.world.width/8}, 3000, 'Linear', true, 0);
		tween.onComplete.add(this.PortersOnComplete, this);
	};

	this.PlaneOnComplete = function (game) {
		game.camp.items.num[0] += this.plane.food;
		game.camp.items.num[2] += this.plane.medicine;
		console.log(mycamp.camp.items);
	};

	this.ConvoyOnComplete = function () {
		console.log('Convoy Arrived');
	};

	this.PortersOnComplete = function () {
		console.log('Porters Arrived');
	};

};
Transports.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Transports;
