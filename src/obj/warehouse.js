var Warehouse = function (game, x, y, frame) {
	'use strict';
	var itemTextLocation = {
		x: game.world.width*15/20,
		y: game.world.height/20 + 25
	};

	var itemBoxLocation = {
		x: game.world.width*15/20,
		y: game.world.height*5.5/20
	};
	var FONTSIZE = 15;

	var myBox = [];
	var group;

	Phaser.Sprite.call(this, game, x, y, 'warehouse', frame);

	this.name = 'warehouse';
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(0.2, 0.2);
	var nameList = ['Food', 'Water', 'Medicine', 'Shelter', 'Capacity'];

	this.items = {
		name: ['food', 'water', 'medicine', 'shelter', 'storage'],
		num: [700, 700, 300, 300, 2000]
	};

	this.ship = {
		name: ['food', 'water', 'medicine', 'shelter'],
		num: [300, 300, 200, 200]
	};

	// Show the stock in the warehouse
	for (var i = 0; i < this.items.name.length; i++) {
		game.add.bitmapText(itemTextLocation.x, itemTextLocation.y + 20 * i,
			'lastmileFont', nameList[i] + ': ' + this.items.num[i],
			FONTSIZE);
	}

	// Player will have the option to expand the storage by 10 units in every 5 minutes;
	this.expandStorage = function () {
		this.items.num[4] += 1000;
	};

	// Show boxes
	group = game.add.group();
	group.inputEnableChildren = true;
	for (var j = 0; j < 4; j++) {
		myBox[j] = group.create(itemBoxLocation.x + 50 * j,
			itemBoxLocation.y, this.items.name[j]);
		myBox[j].alpha = 0.8;
		myBox[j].anchor.setTo(0.5, 0.5);
		myBox[j].scale.setTo(0.4, 0.4);
		myBox[j].input.enableDrag();
	}

	this.onDown = function (sprite) {
		sprite.tint = 0xffffff;
	};

	this.onOver = function (sprite) {
		sprite.alpha = 1;
	};

	this.onOut = function (sprite) {
		sprite.alpha = 0.6;
	};

	group.onChildInputDown.add(this.onDown, this);
	group.onChildInputOut.add(this.onOut, this);
	group.onChildInputOver.add(this.onOver, this);
};
Warehouse.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Warehouse;
