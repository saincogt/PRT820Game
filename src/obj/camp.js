var lives = 3;
var scores = 50000;
var CAMP_IMAGE = 'camp';

var Camp = function (game, x, y, frame) {
	'use strict';
	Phaser.Sprite.call(this, game, x, y, CAMP_IMAGE, frame);

	var campItems = [];
	var itemsLocation = {
		x: game.world.width/20,
		y: game.world.height/20 + 200
	};

	var livesLocation = {
		x: game.world.width/4 - 140,
		y: game.world.height*2/5 - 20
	};
	var FONTSIZE = 20;
	var nameList = ['Food', 'Water', 'Medicine', 'Shelter'];
	this.onStock = 0;
	this.storage = 500;

	this.population = 1000;
	this.name = 'camp';
	this.anchor.setTo(0.5, 0.5);


	lives = game.add.group();
	for (var i = 3; i > 0; i--) {
		var playerLife = lives.create(livesLocation.x + 40 * i, livesLocation.y, 'heartIcon');
		playerLife.anchor.setTo(0.5, 0.5);
		playerLife.alpha = 1;
	}

	this.items = {
		name: ['food', 'water', 'medicine', 'shelter'],
		num: [0, 0, 0, 0],
		rate: [100, 90, 20, 40]
	};
	var campItemNames = ['population', 'foodItem', 'waterItem', 'medicineItem', 'shelterItem', 'storage'];

	// Show the information in the camp;
	this.campPopulation = game.add.bitmapText(itemsLocation.x - 25, itemsLocation.y - 65, 'lastmileFont', this.population, FONTSIZE);
	this.stock = [];
	for (var k = 0; k < this.items.name.length; k++) {
		this.stock[k] = game.add.bitmapText(itemsLocation.x - 25, itemsLocation.y + 25 + 90 * k,
			'lastmileFont', this.items.num[k],
			FONTSIZE);
	}
	this.storageText = game.add.bitmapText(itemsLocation.x - 25, itemsLocation.y + 380, 'lastmileFont', '', FONTSIZE);

	// Show items
	campItems = game.add.group();
	for (var l = 0; l < 6; l++) {
		campItems[l] = campItems.create(itemsLocation.x,
			itemsLocation.y - 100 + 90 * l, campItemNames[l]);
		campItems[l].anchor.setTo(0.5, 0.5);
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
			for (var j = 0; j < this.camp.items.name.length; j++) {
				if (this.camp.items.num[j] >= this.camp.items.rate[j] * this.camp.population / 1000) {
					this.camp.items.num[j] -= this.camp.items.rate[j] * this.camp.population / 1000;
					this.camp.onStock -= this.camp.items.rate[j] * this.camp.population / 1000;
				} else {
					this.camp.onStock -= this.camp.items.num[j];
					this.camp.items.num[j] = 0;
					shortOfItems = true;
				}

				console.log(this.camp.onStock);
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
			game.state.start('over');
		}

	};

	// this.addItem = function (itemName, quantity) {
	// 	if(totalItems + quantity < this.storage) {
	// 		// Add the items;
	// 		totalItems += quantity;
	// 	} else {
	// 		// Fail silently, throw error or whatever you want to do
	// 	}
	// };

	this.addItem = function (camp, transport) {
		for (var i = 0; i < 4; i++) {
			if (camp.onStock + transport.items.num[i] <= this.storage) {
				camp.items.num[i] += transport.items.num[i];
				camp.onStock += transport.items.num[i];
				game.state.states.play.scores += transport.items.num[i];
			} else {
				camp.items.num[i] += this.storage - camp.onStock;
				game.state.states.play.scores += this.storage - camp.onStock;
				camp.onStock  = this.storage;
			}
		}
	};
};

Camp.prototype = Object.create(Phaser.Sprite.prototype);

Camp.prototype.assets = {
	camp: 'src/assets/img/camp.png',
	heartIcon: 'src/assets/img/heart-icon.png',
	population: 'src/assets/img/population.png',
	foodItem: 'src/assets/img/food.png',
	waterItem: 'src/assets/img/water.png',
	medicineItem: 'src/assets/img/medicine.png',
	shelterItem: 'src/assets/img/shelter.png',
	storage: 'src/assets/img/storage.png'

};

module.exports = Camp;
