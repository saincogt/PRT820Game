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
	var path = game.state.states.play.transports;

	Phaser.Sprite.call(this, game, x, y, 'warehouse', frame);

	this.name = 'warehouse';
	this.anchor.setTo(0.5, 0.5);
	var nameList = ['Food', 'Water', 'Medicine', 'Shelter', 'Capacity'];
	var BOX_VALUE = 100;

	var items = {
		name: ['food', 'water', 'medicine', 'shelter', 'storage'],
		num: [700, 700, 300, 300, 2000]
	};

	this.ship = {
		name: ['food', 'water', 'medicine', 'shelter'],
		num: [300, 300, 200, 200]
	};

	// Show the stock in the warehouse
	for (var i = 0; i < items.name.length; i++) {
		game.add.bitmapText(itemTextLocation.x, itemTextLocation.y + 20 * i,
			'lastmileFont', nameList[i] + ': ' + items.num[i],
			FONTSIZE);
	}

	// Player will have the option to expand the storage by 10 units in every 5 minutes;
	this.expandStorage = function () {
		items.num[4] += 1000;
	};

	var addFood = function (currentSprite, endSprite) {
		if (endSprite.items.food < endSprite.storage) {
			endSprite.items.food += BOX_VALUE;
			items.name[0] -= BOX_VALUE;
		}
	};

	var addWater = function (currentSprite, endSprite) {
		// body...
	};

	var addMedicine = function (currentSprite, endSprite) {
		// body...
	};

	var addShelter = function (currentSprite, endSprite) {
		// body...
	};

	// When stop dragging call other funtion and reset locations;
	var stopDragFood = function (currentSprite, endSprite) {
		if (!game.physics.arcade.overlap(currentSprite, endSprite, function(currentSprite, endSprite) {
			// currentSprite.input.draggable = false;
			// currentSprite.position.copyFrom(endSprite.position);
			addFood(currentSprite, endSprite);
		})) {
			currentSprite.position.copyFrom(currentSprite.originalPosition);
		} else {
			currentSprite.position.copyFrom(currentSprite.originalPosition);
		}
	};

	var stopDragWater = function (currentSprite, endSprite) {
		if (!game.physics.arcade.overlap(currentSprite, endSprite, function () {
			// body...
		})) {
			addWater(currentSprite, endSprite);
			currentSprite.position.copyFrom(currentSprite.originalPosition);
		} else {
			currentSprite.position.copyFrom(currentSprite.originalPosition);
		}
	};

	var stopDragMedicine = function (currentSprite, endSprite) {

	};

	var stopDragShelter = function (currentSprite, endSprite) {
		// body...
	};


	// Show boxes
	group = game.add.group();
	group.inputEnableChildren = true;
	for (var j = 0; j < 4; j++) {
		myBox[j] = group.create(itemBoxLocation.x + 50 * j,
			itemBoxLocation.y, items.name[j]);
		myBox[j].alpha = 0.8;
		myBox[j].anchor.setTo(0.5, 0.5);
		myBox[j].input.enableDrag();
		myBox[j].input.enableSnap(32, 32, false, true);
		game.physics.arcade.enable(myBox[j]);
		myBox[j].originalPosition = myBox[j].position.clone();
		myBox[j].value = BOX_VALUE;
	}
	myBox[0].events.onDragStop.add(function(currentSprite) {
		stopDragFood(currentSprite, path.group);
	}, this);
	myBox[1].events.onDragStop.add(function(currentSprite) {
		stopDragWater(currentSprite, path.group);
	}, this);
	myBox[2].events.onDragStop.add(function(currentSprite) {
		stopDragMedicine(currentSprite, path.group);
	}, this);
	myBox[3].events.onDragStop.add(function(currentSprite) {
		stopDragShelter(currentSprite, path.group);
	}, this);

	var loadingzone = game.add.image(game.world.width*7/8, game.world.centerY+150, 'loadingzone');
	loadingzone.anchor.setTo(0.5, 0.5);

	this.onDown = function (sprite) {
		sprite.tint = 0xffffff;
	};

	this.onOver = function (sprite) {
		sprite.alpha = 1;
	};

	this.onOut = function (sprite) {
		sprite.alpha = 0.8;
	};

	group.onChildInputDown.add(this.onDown, this);
	group.onChildInputOut.add(this.onOut, this);
	group.onChildInputOver.add(this.onOver, this);

	var checkOverlap = function (spriteA, spriteB) {
		var boundA = spriteA.getBounds();
		var boundB = spriteB.getBounds();
		return Phaser.Rectangle.intersects(boundA, boundB);
	};


};
Warehouse.prototype = Object.create(Phaser.Sprite.prototype);

Warehouse.prototype.assets = {
	water: 'src/assets/img/waterBox.png',
	food: 'src/assets/img/foodBox.png',
	medicine: 'src/assets/img/medicineBox.png',
	shelter: 'src/assets/img/shelterBox.png',
	warehouse: 'src/assets/img/warehouse-1.png',
	loadingzone: 'src/assets/img/loadingzone.png'

	// "this.load.image\(('[a-z]+'), ('[\-0-9a-zA-Z\.\/]+')\);"
	// \1: \2
};

module.exports = Warehouse;
