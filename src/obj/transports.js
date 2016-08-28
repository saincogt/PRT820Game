'use strict';

var TWEEN_PLANE = 500;
var TWEEN_TRUCK = 2000;
var TWEEN_PORTER = 3000;
var PLANE_WAIT = 40000;
var Transports = function (game, x, y, frame) {
	'use strict';
	Phaser.Sprite.call(this, game, x, y, frame);
	var path = game.state.states.play.camp;

	var optionLocation = {
		x: game.world.width * 7 / 8 - 180,
		y: game.world.centerY + 100
	};

	var transName = ['plane', 'truck', 'porter'];
	this.options = [];

	this.name = 'transports';

	// put 3 transportations
	this.group = game.add.group();
	for (var i = 0; i < 3; i++) {
		this.options[i] = this.group.create(optionLocation.x, optionLocation.y + 60 * i, transName[i]);
		this.options[i].anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.options[i]);
		this.options[i].originalPostion = this.options[i].position.clone();
		this.options[i].items = {
			food: 0,
			water: 0,
			medicine: 0,
			shelter: 0
		};
	}

	this.options[0].storage = 200;
	this.options[1].storage = 500;
	this.options[2].storage = 500;
	this.options[2].population = 1000;

	this.PlaneOnComplete = function () {
		path.items.num[0] += this.options[0].items.food;
		path.items.num[2] += this.options[0].items.medicine;
		this.options[0].items.food = 0;
		this.options[0].items.medicine = 0;
		console.log(path.items.num);
		this.options[0].position.copyFrom(this.options[0].originalPostion);
		this.goPlane.inputEnabled = true;
	};

	this.ConvoyOnComplete = function () {
		path.items.num[0] += this.options[1].items.food;
		path.items.num[1] += this.options[1].items.water;
		path.items.num[2] += this.options[1].items.medicine;
		path.items.num[3] += this.options[1].items.shelter;
		this.options[1].items.food = 0;
		this.options[1].items.water = 0;
		this.options[1].items.medicine = 0;
		this.options[1].items.shelter = 0;
		console.log(path.items.num);
		this.options[1].position.copyFrom(this.options[1].originalPostion);
		this.goConvoy.inputEnabled = true;
	};

	this.PortersOnComplete = function () {
		path.population += this.options[2].population;
		path.items.num[0] += this.options[2].items.food;
		path.items.num[1] += this.options[2].items.water;
		path.items.num[2] += this.options[2].items.medicine;
		path.items.num[3] += this.options[2].items.shelter;
		this.options[2].items.food = 0;
		this.options[2].items.water = 0;
		this.options[2].items.medicine = 0;
		this.options[2].items.shelter = 0;
		console.log(path.items.num, path.population);
		this.options[2].position.copyFrom(this.options[2].originalPostion);
		this.goPorters.inputEnabled = true;
	};

	// Convoy takes 20 seconds, plane 5 seconds, porters 30 seconds to the camp;
	this.sendPlane = function () {
		'use strict';
		// Tween the plane 5 seconds;
		this.goPlane.inputEnabled = false;
		var tween = game.add.tween(this.options[0]);
		tween.to({x: [game.world.width/2, game.world.width/8],
			y: [game.world.centerY-50, game.world.centerY+70]}, TWEEN_PLANE,
			Phaser.Easing.Quadratic.InOut, true, 0);
		var PlaneOnComplete = function() {
			this.PlaneOnComplete(this);
		}.bind(this);

		tween.onComplete.add(PlaneOnComplete, this);
	};

	this.sendConvoy = function () {
		'use strict';

		// Tween the truck 20 seconds;
		this.goConvoy.inputEnabled = false;
		var tween = game.add.tween(this.options[1]);
		tween.to({x: game.world.width/8}, TWEEN_TRUCK, 'Linear', true, 0);
		// var ConvoyOnComplete = function () {
		// 	this.transports.ConvoyOnComplete(this);
		// }.bind(this);
		tween.onComplete.add(this.ConvoyOnComplete, this);
	};

	this.sendPorters = function () {
		'use strict';

		// Tween the porters; 30 seconds
		this.goPorters.inputEnabled = false;
		var tween = game.add.tween(this.options[2]).to({x: game.world.width/8}, TWEEN_PORTER, 'Linear', true, 0);

		// var PortersOnComplete = function () {
		// 	this.transports.PortersOnComplete(this);
		// }.bind(this);
		tween.onComplete.add(this.PortersOnComplete, this);
	};

	this.goPlane = game.add.button(game.world.width*7/8-80, game.world.centerY+100, 'goButton', this.sendPlane, this);
	this.goPlane.anchor.setTo(0.5, 0.5);

	this.goConvoy = game.add.button(game.world.width*7/8-80, game.world.centerY+160, 'goButton', this.sendConvoy, this);
	this.goConvoy.anchor.setTo(0.5, 0.5);

	this.goPorters = game.add.button(game.world.width*7/8-80, game.world.centerY+220, 'goButton', this.sendPorters, this);
	this.goPorters.anchor.setTo(0.5, 0.5);

};

Transports.prototype = Object.create(Phaser.Sprite.prototype);

Transports.prototype.assets = {
	goButton: 'src/assets/img/goButton.png',
	plane: 'src/assets/img/plane.png',
	truck: 'src/assets/img/truck.png',
	porter: 'src/assets/img/porter.png'
};
module.exports = Transports;
