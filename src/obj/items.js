'use strict'

var Items = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	var group = game.add.group();
	group.inputEnableChildren = true;

	var foodBox = group.create(game.world.width*15/20, game.world.height*5.5/20, 'foodBox');
	foodBox.name = 'foodBox';
	foodBox.alpha = 0.6;

	var waterBox = group.create(game.world.width*16/20, game.world.height*5.5/20, 'waterBox');
	waterBox.name = 'waterBox';
	waterBox.alpha = 0.6;

	var medicineBox = group.create(game.world.width*17/20, game.world.height*5.5/20, 'medicineBox');
	medicineBox.name = 'medicineBox';
	medicineBox.alpha = 0.6;

	var shelterBox = group.create(game.world.width*18/20, game.world.height*5.5/20, 'shelterBox');
	shelterBox.name = 'shelterBox';
	shelterBox.alpha = 0.6;

	// var foodBox = game.add.image(game.world.width*15/20, game.world.height*5.5/20, 'foodBox');
	foodBox.anchor.setTo(0.5, 0.5);
	foodBox.scale.setTo(0.4, 0.4);
	// this.foodBox.inputEnabled = true;
	foodBox.input.enableDrag();
	// this.foodBox.events.onDragStop.add(this.addFood);

	// var waterBox = game.add.image(game.world.width*16/20, game.world.height*5.5/20, 'waterBox');
	waterBox.anchor.setTo(0.5, 0.5);
	waterBox.scale.setTo(0.4, 0.4);
	// waterBox.inputEnabled = true;
	waterBox.input.enableDrag();
	// this.waterBox.events.onDragStop.add(this.addWater);

	// var medicineBox = game.add.image(game.world.width*17/20, game.world.height*5.5/20, 'medicineBox');
	medicineBox.anchor.setTo(0.5, 0.5);
	medicineBox.scale.setTo(0.4, 0.4);
	// medicineBox.inputEnabled = true;
	medicineBox.input.enableDrag();
	// this.medicineBox.events.onDragStop.add(this.addMedicine);

	// var shelterBox = game.add.image(game.world.width*18/20, game.world.height*5.5/20, 'shelterBox');
	shelterBox.anchor.setTo(0.5, 0.5);
	shelterBox.scale.setTo(0.4, 0.4);
	// shelterBox.inputEnabled = true;
	shelterBox.input.enableDrag();
	// this.shelterBox.events.onDragStop.add(this.addShelter);

	group.onChildInputOver.add(this.onOver, this);
	group.onChildInputOut.add(this.onOut, this);
	group.onChildInputDown.add(this.onDown, this);


	this.onOver = function (sprite) {
		sprite.alpha = 1;
	};

	this.onOut = function (sprite) {
		sprite.alpha = 0.6;
	};
	this.onDown = function (sprite) {
		sprite.tint = 0xffffff;
	};

	this.addFood = function (sprite) {
		// if (checkOverlap(sprite.foodBox, game.state.states.play.transports.plane)) {
		// 	console.log('On Top');
		// }
		// else {
		// 	console.log('No Overlap');
		// };
	};

	this.addWater = function (sprite) {
		if (sprite.y < 600) {
			console.log('Add water!');
			console.log(sprite.getBounds());
		}
	};

	this.addMedicine = function (sprite) {
		if (true) {
			console.log('Add Medicine');
		}
	};

	this.addShelter = function (sprite) {
		if (true) {
			console.log('Add shelter!');
		}
	};

	this.checkOverlap = function (spriteA, spriteB) {
		boundsA = spriteA.getBounds();
		boundsB = spriteB.getBounds();
		return Phaser.Rectangle.intersects(this.boundsA, this.boundsB);
	};

};

Items.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Items;

