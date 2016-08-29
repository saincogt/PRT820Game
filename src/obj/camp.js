var lives = 3;
var scores = 50000;
var CAMP_IMAGE = 'camp';

var Camp = function (game, x, y, frame) {
	'use strict';


	var itemTextLocation = {
		x: game.world.width/20,
		y: game.world.height/20 + 25
	};

	var livesLocation = {
		x: game.world.width/2 - 100,
		y: 60
	};
	var FONTSIZE = 15;
	var nameList = ['Food', 'Water', 'Medicine', 'Shelter', 'Capacity'];

	this.population = 1000;

	Phaser.Sprite.call(this, game, x, y, CAMP_IMAGE, frame);
	this.name = 'camp';
	this.anchor.setTo(0.5, 0.5);


	lives = game.add.group();
	for (var i = 3; i > 0; i--) {
		var playerLife = lives.create(livesLocation.x + 40 * i, livesLocation.y, 'heartIcon');
		playerLife.anchor.setTo(0.5, 0.5);
		playerLife.alpha = 1;
	}

	this.items = {
		name: ['food', 'water', 'medicine', 'shelter', 'storage'],
		num: [0, 0, 0, 0, 500],
		rate: [100, 90, 20, 40]
	};

	// Show the stock in the camp;
	this.stock = [];
	for (var k = 0; k < this.items.name.length; k++) {
		this.stock[k] = game.add.bitmapText(itemTextLocation.x, itemTextLocation.y + 20 * k,
			'lastmileFont', nameList[k] + ': ' + this.items.num[k],
			FONTSIZE);
	}

	// funtions of the camp;
	this.addPopulation = function () {
		this.population += 1000;
	};

	// Player will have the option to expand the storage in every 3 minutes;
	this.expandStorage = function () {
		this.items.num[4] += 500;
	};

	// Consume items in every minute;
	this.consumeItems = function () {
		if (lives.countLiving() > 0) {
			var shortOfItems = false;
			for (var j = 0; j < this.camp.items.name.length - 1; j++) {
				if (this.camp.items.num[j] >= this.camp.items.rate[j] * this.camp.population / 1000) {
					this.camp.items.num[j] -= this.camp.items.rate[j] * this.camp.population / 1000;
				} else {
					this.camp.items.num[j] = 0;
					shortOfItems = true;
				}
			}
			if (shortOfItems) {
				this.camp.lossLife();
			}
		} else {
			return;
		}
	};

	this.lossLife = function () {
		var stillAlive = lives.getFirstAlive();
		if (stillAlive) {
			stillAlive.kill();
		}
		if (lives.countLiving() < 1) {
			// var gameOver = game.add.bitmapText(game.world.width/2, game.world.height/2,'lastmileFont', 'Game Over!\n Your Score: ' + scores, 20);
			// gameOver.anchor.setTo(0.5, 0.5);
			// return;
			game.state.start('over');
		}

	};
};

Camp.prototype = Object.create(Phaser.Sprite.prototype);

Camp.prototype.assets = {
	camp: 'src/assets/img/camp.png',
	heartIcon: 'src/assets/img/heart-icon.png'
};

module.exports = Camp;
