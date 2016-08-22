// 'use strict';

// var Items = function (game, x, y, frame) {
// 	Phaser.Sprite.call(this, game, x, y, frame);

// 	this.showBox = function () {

// 		var group = game.add.group();
// 		group.inputEnableChildren = true;

// 		var foodBox = group.create(game.world.width*15/20, game.world.height*5.5/20, 'foodBox');
// 		foodBox.name = 'foodBox';
// 		foodBox.alpha = 0.6;

// 		var waterBox = group.create(game.world.width*16/20, game.world.height*5.5/20, 'waterBox');
// 		waterBox.name = 'waterBox';
// 		waterBox.alpha = 0.6;

// 		var medicineBox = group.create(game.world.width*17/20, game.world.height*5.5/20, 'medicineBox');
// 		medicineBox.name = 'medicineBox';
// 		medicineBox.alpha = 0.6;

// 		var shelterBox = group.create(game.world.width*18/20, game.world.height*5.5/20, 'shelterBox');
// 		shelterBox.name = 'shelterBox';
// 		shelterBox.alpha = 0.6;

// 		// var foodBox = game.add.image(game.world.width*15/20, game.world.height*5.5/20, 'foodBox');
// 		foodBox.anchor.setTo(0.5, 0.5);
// 		foodBox.scale.setTo(0.4, 0.4);

// 		// foodBox.inputEnabled = true;
// 		foodBox.input.enableDrag();

// 		// var waterBox = game.add.image(game.world.width*16/20, game.world.height*5.5/20, 'waterBox');
// 		waterBox.anchor.setTo(0.5, 0.5);
// 		waterBox.scale.setTo(0.4, 0.4);

// 		// waterBox.inputEnabled = true;
// 		waterBox.input.enableDrag();

// 		// var medicineBox = game.add.image(game.world.width*17/20, game.world.height*5.5/20, 'medicineBox');
// 		medicineBox.anchor.setTo(0.5, 0.5);
// 		medicineBox.scale.setTo(0.4, 0.4);

// 		// medicineBox.inputEnabled = true;
// 		medicineBox.input.enableDrag();

// 		// var shelterBox = game.add.image(game.world.width*18/20, game.world.height*5.5/20, 'shelterBox');
// 		shelterBox.anchor.setTo(0.5, 0.5);
// 		shelterBox.scale.setTo(0.4, 0.4);

// 		// shelterBox.inputEnabled = true;
// 		shelterBox.input.enableDrag();

// 		group.onChildInputOver.add(this.onOver, this);
// 		group.onChildInputOut.add(this.onOut, this);
// 		group.onChildInputDown.add(this.onDown, this);

// 	};

// 	this.onOver = function (sprite) {
// 		sprite.alpha = 1;
// 	};

// 	this.onOut = function (sprite) {
// 		sprite.alpha = 0.6;
// 	};
// 	this.onDown = function (sprite) {
// 		sprite.tint = 0xffffff;
// 	};

// };

// Items.prototype = Object.create(Phaser.Sprite.prototype);

// module.exports = Items;

