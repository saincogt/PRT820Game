var Warehouse = function (game, x, y, frame) {
	'use strict';

	Phaser.Sprite.call(this, game, x, y, 'warehouse', frame);
	var itemTextLocation = {
		x: game.world.width*15/20,
		y: game.world.height/20 + 25
	};

	var itemBoxLocation = {
		x: game.world.width*19/20,
		y: game.world.height*7/20 - 25
	};
	var FONTSIZE = 20;

	var myBox = [];
	var group = {};
	var path = game.state.states.play.transports;


	this.name = 'warehouse';
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(0.63, 0.63);
	var nameList = ['Food', 'Water', 'Medicine', 'Shelter'];
	var BOX_VALUE = 100;

	this.items = {
		name: ['food', 'water', 'medicine', 'shelter', 'warehousestorage'],
		num: [700, 700, 300, 300, 2000]
	};

	this.ship = {
		name: ['food', 'water', 'medicine', 'shelter'],
		num: [300, 300, 200, 200]
	};
	this.nowHave = 2000;


	// Show the stock in the warehouse
	this.stock = [];
	for (var i = 0; i < this.items.name.length; i++) {
		this.stock[i] = game.add.bitmapText(itemBoxLocation.x + 20, itemBoxLocation.y + 45 + 90 * i,
			'lastmileFont', this.items.num[i],
			FONTSIZE);
		this.stock[i]._align = 'right';
		this.stock[i].anchor.setTo(1, 0.5);
	}

	// Player will have the option to expand the storage by 10 units in every 5 minutes;
	this.expandStorage = function () {
		this.items.num[4] += 1000;
	};

	var addFood = function (currentSprite, endSprite) {
		if (endSprite.nowHave < endSprite.storage) {
			if (game.state.states.play.warehouse.items.num[0] >= BOX_VALUE) {
				endSprite.items.num[0] += BOX_VALUE;
				game.state.states.play.warehouse.items.num[0] -= BOX_VALUE;
				game.state.states.play.warehouse.nowHave -= BOX_VALUE;
				endSprite.nowHave += 100;
			}
		}
	};

	var addWater = function (currentSprite, endSprite) {
		if (endSprite.nowHave < endSprite.storage && endSprite.key !== 'plane') {
			if (game.state.states.play.warehouse.items.num[1] >= BOX_VALUE) {
				endSprite.items.num[1] += BOX_VALUE;
				game.state.states.play.warehouse.items.num[1] -= BOX_VALUE;
				game.state.states.play.warehouse.nowHave -= BOX_VALUE;
				endSprite.nowHave += 100;
			}
		}
	};

	var addMedicine = function (currentSprite, endSprite) {
		if (endSprite.nowHave < endSprite.storage) {
			if (game.state.states.play.warehouse.items.num[2] >= BOX_VALUE) {
				endSprite.items.num[2] += BOX_VALUE;
				game.state.states.play.warehouse.items.num[2] -= BOX_VALUE;
				game.state.states.play.warehouse.nowHave -= BOX_VALUE;
				endSprite.nowHave += 100;
			}
		}
	};

	var addShelter = function (currentSprite, endSprite) {
		if (endSprite.nowHave < endSprite.storage && endSprite.key !== 'plane') {
			if (game.state.states.play.warehouse.items.num[3] >= BOX_VALUE) {
				endSprite.items.num[3] += BOX_VALUE;
				game.state.states.play.warehouse.items.num[3] -= BOX_VALUE;
				game.state.states.play.warehouse.nowHave -= BOX_VALUE;
				endSprite.nowHave += 100;
			}
		}
	};

	// When stop dragging call other funtion and reset locations;
	var stopDragFood = function (currentSprite, endSprite) {
		game.physics.arcade.overlap(currentSprite, endSprite, addFood);
		var tween = game.add.tween(currentSprite);
		tween.to(currentSprite.originalPosition, 100, 'Linear', true, 0);
	};

	var stopDragWater = function (currentSprite, endSprite) {
		game.physics.arcade.overlap(currentSprite, endSprite, addWater);
		var tween = game.add.tween(currentSprite);
		tween.to(currentSprite.originalPosition, 100, 'Linear', true, 0);
	};

	var stopDragMedicine = function (currentSprite, endSprite) {
		game.physics.arcade.overlap(currentSprite, endSprite, addMedicine);
		var tween = game.add.tween(currentSprite);
		tween.to(currentSprite.originalPosition, 100, 'Linear', true, 0);
	};

	var stopDragShelter = function (currentSprite, endSprite) {
		game.physics.arcade.overlap(currentSprite, endSprite, addShelter);
		var tween = game.add.tween(currentSprite);
		tween.to(currentSprite.originalPosition, 100, 'Linear', true, 0);
	};

	// Show boxes
	group = game.add.group();
	group.inputEnableChildren = true;
	for (var j = 0; j < 4; j++) {
		myBox[j] = group.create(itemBoxLocation.x,
			itemBoxLocation.y + 90 * j, this.items.name[j]);
		myBox[j].alpha = 1;
		myBox[j].anchor.setTo(0.5, 0.5);
		myBox[j].input.enableDrag();
		myBox[j].input.enableSnap(32, 32, false, true);
		game.physics.arcade.enable(myBox[j]);
		myBox[j].originalPosition = myBox[j].position.clone();
		myBox[j].value = BOX_VALUE;
	}

	group.create(itemBoxLocation.x, itemBoxLocation.y + 360, this.items.name[4]).anchor.setTo(0.5, 0.5);

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

	this.onDown = function (sprite) {
		sprite.tint = 0xffffff;
		sprite.alpha = 0.8;
	};

	// this.onOver = function (sprite) {
	// 	sprite.alpha = 1;
	// };

	this.onOut = function (sprite) {
		sprite.alpha = 1;
	};

	group.onChildInputDown.add(this.onDown, this);
	group.onChildInputOut.add(this.onOut, this);
	// group.onChildInputOver.add(this.onOver, this);

	// var checkOverlap = function (spriteA, spriteB) {
	// 	var boundA = spriteA.getBounds();
	// 	var boundB = spriteB.getBounds();
	// 	return Phaser.Rectangle.intersects(boundA, boundB);
	// };

	this.refillStock = function () {
		for (var i = 0; i < 4; i++) {
			if (this.warehouse.nowHave + this.warehouse.ship.num[i] <= this.warehouse.items.num[4]) {
				this.warehouse.items.num[i] += this.warehouse.ship.num[i];
				this.warehouse.nowHave += this.warehouse.ship.num[i];
			} else {
				this.warehouse.items.num[i] += this.warehouse.items.num[4] - this.warehouse.nowHave;
				this.warehouse.nowHave = this.warehouse.items.num[4];
			}
		}
	};

};
Warehouse.prototype = Object.create(Phaser.Sprite.prototype);

Warehouse.prototype.assets = {
	warehouse: 'src/assets/img/warehouse.png',
	water: 'src/assets/img/waterBox.png',
	food: 'src/assets/img/foodBox.png',
	medicine: 'src/assets/img/medicineBox.png',
	shelter: 'src/assets/img/shelterBox.png',
	warehousestorage: 'src/assets/img/warehouseStorage.png'

	// "this.load.image\(('[a-z]+'), ('[\-0-9a-zA-Z\.\/]+')\);"
	// \1: \2
};

module.exports = Warehouse;
