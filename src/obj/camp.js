'use strict'

var Camp = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'camp', frame);
	
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(0.2, 0.2);
	this.name = 'camp';

	this.food = 0;
	this.water = 0;
	this.medicine = 0;
	this.shelter = 0;
	this.population = 1000;
	
	// Consumption rate of food is 1 unit per minute. For water: 90% of food.
	// Comsumption rate of medicines: 20% of food. For shelters: 40% of food.
	this.rateFood = 100;
	this.rateWater = 90;
	this.rateMedicine = 20;
	this.rateShelter = 40;

	// The camp warehouse starts with a capacity of 5 units.
	this.storage = 5;
	
	// Population of the camp will be increased every minute.
	this.addPopulation = function () {
		this.population = this.population + 1000;
	};

	// Show the items in the stock of camp warehouse.
	this.showStock = function () {
		game.add.bitmapText(game.world.width/20, game.world.height/20+25, 'lastmileFont', 'Food: ' + this.food, 15);
		game.add.bitmapText(game.world.width/20, game.world.height/20+45, 'lastmileFont', 'Water: ' + this.water, 15);
		game.add.bitmapText(game.world.width/20, game.world.height/20+65, 'lastmileFont', 'Medicine: ' + this.medicine, 15);
		game.add.bitmapText(game.world.width/20, game.world.height/20+85, 'lastmileFont', 'Shelter: ' + this.shelter, 15);
		game.add.bitmapText(game.world.width/20, game.world.height/20+105, 'lastmileFont', 'Capacity: ' + this.storage, 15);
	};

	// Player will have the option to expand the storage in every 3 minutes.
	this.expandStorage = function () {
		this.storage += 5;

	};

	// Consume four items in every minute;
	this.consume = function () {
		this.food -= this.rateFood;
		this.water -= this.rateWater;
		this.medicine -= this.rateMedicine;
		this.shelter -= this.rateShelter;
	};

};

// consume items every 1 minute (1 week in game time)
// Camp.prototype.consume = function() {
// 	this.food -= this.rateFood;
// 	this.water -= this.rateWater;
// 	this.medicine -= this.rateMedicine;
// 	this.shelter -= this.rateShelter;
// };

Camp.prototype = Object.create(Phaser.Sprite.prototype);
// Camp.prototype.constructor = Camp;

module.exports = Camp;