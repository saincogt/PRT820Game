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

<<<<<<< HEAD
	this.sendPorters = function () {
<<<<<<< HEAD
		// Tween the porters; 30 seconds
		var tween = game.add.tween(this.porter).to({x: game.world.width/8}, 3000, 'Linear', true, 0);
		tween.onComplete.add(this.PortersOnComplete, this);
	};

	this.PlaneOnComplete = function () {
		console.log('Plane Arrived');

		// (-_-;) complicated
		game.state.states.play.camp.food += this.plane.food;
		// game.state.states.play.camp.water += this.plane.water;
		game.state.states.play.camp.medicine += this.plane.medicine;
		// game.state.states.play.camp.shelter += this.plane.shelter;

		// console.log(game.state.states.play.camp.food);
		
	};

	this.ConvoyOnComplete = function () {
		console.log('Convoy Arrived');
		game.state.states.play.camp.food += this.truck.food;
		game.state.states.play.camp.water += this.truck.water;
		game.state.states.play.camp.medicine += this.truck.medicine;
		game.state.states.play.camp.shelter += this.truck.shelter;

	};

	this.PortersOnComplete = function () {
		console.log('Porters Arrived');
		game.state.states.play.camp.food += this.porter.food;
		game.state.states.play.camp.water += this.porter.water;
		game.state.states.play.camp.medicine += this.porter.medicine;
		game.state.states.play.camp.shelter += this.porter.shelter;
		game.state.states.play.camp.population += this.porter.population;

		// console.log(game.state.states.play.camp.population);

	};

=======
		// Tween the porters;
		game.add.tween(this.porter).to({x: game.world.width/8}, 30000, 'Linear', true, 0);
=======
>>>>>>> parent of 60f1345... mainly revised transports and items classes
	};
>>>>>>> parent of 88a02ed... Enabled the updates of items in camp and warehouse. When transportations arrived, add the items to the camp.
};

Transports.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Transports;