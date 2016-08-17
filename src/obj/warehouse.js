'use strict'

var Warehouse = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'warehouse', frame);

	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(0.2, 0.2);
	this.name = 'warehouse';

	this.food = 0;
	this.water = 0;
	this.medicine = 0;
	this.shelter = 0;
	this.storage = 20;

	// Display the stock in the warehouse.
	this.showStock = function () {
		game.add.bitmapText(game.world.width*15/20, game.world.height/20+25, 'lastmileFont', 'Food: ' + this.food, 15);
		game.add.bitmapText(game.world.width*15/20, game.world.height/20+45, 'lastmileFont', 'Water: ' + this.water, 15);
		game.add.bitmapText(game.world.width*15/20, game.world.height/20+65, 'lastmileFont', 'Medicine: ' + this.medicine, 15);
		game.add.bitmapText(game.world.width*15/20, game.world.height/20+85, 'lastmileFont', 'Shelter: ' + this.shelter, 15);
		game.add.bitmapText(game.world.width*15/20, game.world.height/20+105, 'lastmileFont', 'Capacity: ' + this.storage, 15);
	};

	// Player will have the option to expand the storage by 10 units in every 5 minutes.
	this.expandStorage = function () {
		this.storage += 10;
	};
};

Warehouse.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Warehouse;
