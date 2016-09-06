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
		x: game.world.width * 6 / 8 - 70,
		y: game.world.centerY - 90
	};

	var campPostion = {
		x: game.state.states.play.camp.position.x,
		y: game.state.states.play.camp.position.y
	};

	var transName = ['plane', 'truck', 'porter'];
	this.options = [];
	this.stock = [];

	this.name = 'transports';

	// put 3 transportations
	this.group = game.add.group();
	for (var i = 0; i < 3; i++) {
		this.options[i] = this.group.create(optionLocation.x - 32 * i, optionLocation.y + 138 * i, transName[i]);
		this.options[i].anchor.setTo(0.5, 0.5);
		game.physics.arcade.enable(this.options[i]);
		this.options[i].inputEnabled = true;
		this.options[i].originalPostion = this.options[i].position.clone();
		this.options[i].items = {
			name: ['food', 'water', 'medicine', 'shelter'],
			num: [0, 0, 0, 0]
		};
		this.options[i].nowHave = 0;
	}

	this.options[0].storage = 200;
	this.options[1].storage = 500;
	this.options[2].storage = 500;
	this.options[2].population = 1000;

	// Show the stock of each options
	for (var j = 0; j < this.options.length; j++) {
		this.stock[j] = game.add.bitmapText(optionLocation.x + 15 - 32 * j, optionLocation.y + 33 + 138 * j, 'lastmileFont', '', 25);
	}

	this.PlaneOnComplete = function () {
		path.items.num[0] += this.options[0].items.num[0];
		path.items.num[2] += this.options[0].items.num[2];
		this.options[0].items.num[0] = 0;
		this.options[0].items.num[2] = 0;
		this.options[0].position.copyFrom(this.options[0].originalPostion);
		// this.goPlane.inputEnabled = true;
		this.goPlane.visible = true;
		this.options[0].nowHave = 0;
	};

	this.ConvoyOnComplete = function () {

		// for (var i = 0; i < 4; i++) {
		// 	if (path.onStock < path.storage) {
		// 		path.items.num[i] += this.options[1].items.num[i];
		// 		this.options[1].items.num[i] = 0;
		// 		path.onStock += 100;
		// 		console.log(path.onStock, path.storage);
		// 	}
		// }
		path.items.num[0] += this.options[1].items.num[0];
		path.items.num[1] += this.options[1].items.num[1];
		path.items.num[2] += this.options[1].items.num[2];
		path.items.num[3] += this.options[1].items.num[3];
		this.options[1].items.num[0] = 0;
		this.options[1].items.num[1] = 0;
		this.options[1].items.num[2] = 0;
		this.options[1].items.num[3] = 0;
		this.options[1].position.copyFrom(this.options[1].originalPostion);
		// this.goConvoy.inputEnabled = true;
		this.goConvoy.visible = true;
		this.options[1].nowHave = 0;
	};

	this.PortersOnComplete = function () {
		path.population += this.options[2].population;
		path.items.num[0] += this.options[2].items.num[0];
		path.items.num[1] += this.options[2].items.num[1];
		path.items.num[2] += this.options[2].items.num[2];
		path.items.num[3] += this.options[2].items.num[3];
		this.options[2].items.num[0] = 0;
		this.options[2].items.num[1] = 0;
		this.options[2].items.num[2] = 0;
		this.options[2].items.num[3] = 0;
		this.options[2].position.copyFrom(this.options[2].originalPostion);
		// this.goPorters.inputEnabled = true;
		this.goPorters.visible = true;
		this.options[2].nowHave = 0;
	};

	// Convoy takes 20 seconds, plane 5 seconds, porters 30 seconds to the camp;
	this.sendPlane = function () {
		'use strict';
		// Tween the plane 5 seconds;
		// this.goPlane.inputEnabled = false;
		this.goPlane.visible = false;
		var tween = game.add.tween(this.options[0]);
		tween.to({x: [game.world.width/2, campPostion.x],
			y: [game.world.centerY-200, campPostion.y]}, TWEEN_PLANE,
			Phaser.Easing.Quadratic.InOut, true, 0);
		var PlaneOnComplete = function() {
			this.PlaneOnComplete(this);
		}.bind(this);

		tween.onComplete.add(PlaneOnComplete, this);
	};

	this.sendConvoy = function () {
		'use strict';

		// Tween the truck 20 seconds;
		// this.goConvoy.inputEnabled = false;
		this.goConvoy.visible = false;
		var tween = game.add.tween(this.options[1]);
		tween.to({x: campPostion.x, y: campPostion.y}, TWEEN_TRUCK, 'Linear', true, 0);
		// var ConvoyOnComplete = function () {
		// 	this.transports.ConvoyOnComplete(this);
		// }.bind(this);
		tween.onComplete.add(this.ConvoyOnComplete, this);
	};

	this.sendPorters = function () {
		'use strict';

		// Tween the porters; 30 seconds
		// this.goPorters.inputEnabled = false;
		this.goPorters.visible = false;
		var tween = game.add.tween(this.options[2]).to({x: campPostion.x, y: campPostion.y}, TWEEN_PORTER, 'Linear', true, 0);

		// var PortersOnComplete = function () {
		// 	this.transports.PortersOnComplete(this);
		// }.bind(this);
		tween.onComplete.add(this.PortersOnComplete, this);
	};

	this.onDown = function (sprite) {
		sprite.alpha = 0.5;
	};

	this.goPlane = game.add.button(this.options[0].position.x + 90, this.options[0].position.y, 'goButton', this.sendPlane, this);
	this.goPlane.anchor.setTo(0.5, 0.5);

	this.goConvoy = game.add.button(this.options[1].position.x + 90, this.options[1].position.y, 'goButton', this.sendConvoy, this);
	this.goConvoy.anchor.setTo(0.5, 0.5);

	this.goPorters = game.add.button(this.options[2].position.x + 90, this.options[2].position.y, 'goButton', this.sendPorters, this);
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
