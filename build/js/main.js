(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var menuState = require('./states/menu');
var playState = require('./states/play');
var overState = require('./states/over');

// Author: Sancho
// Create new Phaser game, the element '' is a DOM ID, the game can be inserted the DOM element with this ID.
var game = new Phaser.Game(960, 720, Phaser.AUTO, 'last-mile');

// Added all the states. 'name' is the casual name of the state, they will be used when we call them.
// nameState is the official name, we will use them to define the states.
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('over', overState);

game.state.start('menu');
},{"./states/menu":5,"./states/over":6,"./states/play":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

var TWEEN_PLANE = 500;
var TWEEN_TRUCK = 2000;
var TWEEN_PORTER = 3000;
var PLANE_WAIT = 40000;

/**
* @param {phaser.Game} game The phaser game instance
**/
var Transports = function (game, x, y, frame) {
	'use strict';
	Phaser.Sprite.call(this, game, x, y, frame);
	var gameCamp = game.state.states.play.camp;

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
		// extract to camp
		gameCamp.addItem(gameCamp, this.options[0]);

		// stay
		this.clearStock(this.options[0]);
		this.options[0].position.copyFrom(this.options[0].originalPostion);
		// this.goPlane.inputEnabled = true;
		this.goPlane.visible = true;
		this.options[0].nowHave = 0;
	};

	this.ConvoyOnComplete = function () {
		gameCamp.addItem(gameCamp, this.options[1]);
		this.clearStock(this.options[1]);
		this.options[1].position.copyFrom(this.options[1].originalPostion);
		// this.goConvoy.inputEnabled = true;
		this.goConvoy.visible = true;
		this.options[1].nowHave = 0;
	};

	this.PortersOnComplete = function () {
		gameCamp.population += this.options[2].population;
		gameCamp.addItem(gameCamp, this.options[2]);
		this.clearStock(this.options[2]);
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
		// var PlaneOnComplete = function() {
		// 	this.PlaneOnComplete(this);
		// }.bind(this);

		tween.onComplete.add(this.PlaneOnComplete, this);
	};

	this.sendConvoy = function () {
		'use strict';

		// Tween the truck 20 seconds;
		// this.goConvoy.inputEnabled = false;
		this.goConvoy.visible = false;
		var tween = game.add.tween(this.options[1]);
		tween.to({x: campPostion.x, y: campPostion.y}, TWEEN_TRUCK, 'Linear', true, 0);
		// var ConvoyOnComplete = function () {
		// 	this.ConvoyOnComplete(this);
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
		// 	this.PortersOnComplete(this);
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

	this.clearStock = function (transport) {
		for (var i = 0; i < 4; i++) {
			transport.items.num[i] = 0;
		}
	};

};

Transports.prototype = Object.create(Phaser.Sprite.prototype);

Transports.prototype.assets = {
	goButton: 'src/assets/img/goButton.png',
	plane: 'src/assets/img/plane.png',
	truck: 'src/assets/img/truck.png',
	porter: 'src/assets/img/porter.png'
};
module.exports = Transports;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict'

var menuState = function (game) {
	// console.log("Now the 'menu' state starts!");
};

menuState.prototype = {
	preload: function () {
		'use strict';
		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('fullscreen', 'src/assets/img/fullscreen.png');
		this.load.image('title', 'src/assets/img/title1.png');
		this.load.image('play', 'src/assets/img/playMenu.png');
		this.load.image('score', 'src/assets/img/scoreMenu.png');
		this.load.bitmapFont('lastmileFont', 'src/assets/font/font.png', 'src/assets/font/font.fnt');
	},
	create: function () {
		'use strict';
		this.game.add.image(0, 0, 'background');
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

		var title = this.game.add.sprite(this.world.centerX, this.world.centerY/2-20, 'title');
		title.anchor.setTo(0.5, 0.5);
		var tween = this.add.tween(title);
		tween.to({y: this.world.height/2-50}, 800, Phaser.Easing.Bounce.Out, true, 500);

		var startButton = this.game.add.button(this.world.centerX, this.world.centerY + 50, 'play', this.startPlay, this);
		startButton.anchor.setTo(0.5, 0.5);
		startButton.scale.setTo(1.2, 1.2);

		// var scoreButton = this.game.add.button(this.world.centerX, 360, 'score', this.checkScore, this);
		// scoreButton.anchor.setTo(0.5, 0.5);

		var authorText = this.add.bitmapText(this.world.centerX, 500, 'lastmileFont', 'Developed by Sancho', 20);
		authorText.anchor.setTo(0.5, 0.5);
		this.game.add.button(this.world.width-50, this.world.height-50, 'fullscreen', this.fullScreen, this);

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
	},
	startPlay: function () {
		'use strict';
		this.game.state.start('play');
	},
	checkScore: function () {
		'use strict';

		// this.game.state.start('score');
	},
	fullScreen: function () {
		if (this.game.scale.isFullScreen) {
			this.game.scale.stopFullScreen();
		} else {
			this.game.scale.startFullScreen(false);
		}
	},
	render: function () {
		'use strict';

		// game.debug.game();
	}
};
module.exports = menuState;


},{}],6:[function(require,module,exports){
var overState = function (game) {
	// body...
};

var overObjects = overState.prototype.assets;
overState.prototype = {
	preload: function () {
		// for (var overProp in overObjects) {
		// 	if (overObjects.hasOwnProperty(overProp)) {
		// 		this.load.image(overProp, overObjects[overProp]);
		// 	}
		// }
		this.load.image('gameover', 'src/assets/img/gameover.png');
		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('mainmenu', 'src/assets/img/mainmenu.png');
		this.load.image('playagain', 'src/assets/img/playagain.png');
	},

	create: function () {
		this.game.add.image(0, 0, 'background');
		// var gameOver = this.game.add.sprite(this.world.centerX, this.world.centerY, 'gameover').anchor.setTo(0.5, 0.5);
		// var tween = this.add.tween(gameOver);
		// tween.to({y: this.world.centerY+5}, 800, Phaser.Easing.Bounce.Out, true, 500);
		var gameOver = this.game.add.sprite(this.world.centerX, this.world.centerY-150, 'gameover');
		gameOver.anchor.setTo(0.5, 0.5);
		var tween = this.add.tween(gameOver);
		tween.to({y: this.world.centerY-50}, 800, Phaser.Easing.Bounce.Out, true, 500);

		this.add.button(this.world.centerX, this.world.centerY + 30, 'playagain', this.playAgain, this).anchor.setTo(0.5, 0.5);
		this.add.button(this.world.centerX, this.world.centerY + 80, 'mainmenu', this.mainMenu, this).anchor.setTo(0.5, 0.5);
		this.add.bitmapText(this.world.centerX, this.world.centerY + 130, 'lastmileFont', 'Your Score: ' + this.game.state.states.play.scores, 20).anchor.setTo(0.5, 0.5);

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
	},

	update: function () {
		// body...
	},

	render: function () {
		// body...
	},

	playAgain: function () {
		this.game.state.start('play');
	},

	mainMenu: function () {
		this.game.state.start('menu');
	}
};

overState.prototype.assets = {
	gameover: 'src/assets/img/gameover.png',
	mainmenu: 'src/assets/img/mainmenu.png',
	playagain: 'src/assets/img/playagain.png'
};

module.exports = overState;

},{}],7:[function(require,module,exports){
var playState = function (game) {
	'use strict';
	// console.log("Now starts the Play State!");
};

var Camp = require('../obj/camp');
var Warehouse = require('../obj/warehouse');
var Transports = require('../obj/transports');

var populationText;
var scoreText;
var gamePause = false;
var score = 0;

var campObjects = Camp.prototype.assets;
var warehouseObjects = Warehouse.prototype.assets;
var tranpsortsObjects = Transports.prototype.assets;
playState.prototype = {
	preload: function () {
		'use strict';
		for(var campProp in campObjects) {
			if(campObjects.hasOwnProperty(campProp)) {
				this.load.image(campProp, campObjects[campProp]);
			}
		}

		for (var warehouseProp in warehouseObjects) {
			if (warehouseObjects.hasOwnProperty(warehouseProp)) {
				this.load.image(warehouseProp, warehouseObjects[warehouseProp]);
			}
		}

		for (var transportsProp in tranpsortsObjects) {
			if(tranpsortsObjects.hasOwnProperty(transportsProp)) {
				this.load.image(transportsProp, tranpsortsObjects[transportsProp]);
			}
		}

		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('back', 'src/assets/img/backArrow.png');
		this.load.image('pause', 'src/assets/img/pause.png');
		this.load.bitmapFont('lastmileFont', 'src/assets/font/font.png', 'src/assets/font/font.fnt');
		this.load.image('waiting', 'src/assets/img/waiting.png');
		this.load.image('failed', 'src/assets/img/fail.png');
		this.load.image('upgrade', 'src/assets/img/upgrade.png');

	},
	create: function () {
		'use strict';
		var background = this.add.image(0, 0, 'background');

		this.camp = new Camp(this.game, this.world.width/8 + 60, this.world.centerY);
		this.game.add.existing(this.camp);

		this.transports = new Transports(this.game);
		this.game.add.existing(this.transports);

		this.warehouse = new Warehouse(this.game, this.world.width-270, this.world.centerY);
		this.game.add.existing(this.warehouse);
		this.warehouse.sendToBack();
		background.sendToBack();

		this.killALife = this.add.button(this.world.width/4 + 50, this.world.height*2/5 - 20, 'failed', this.camp.lossLife, this);
		this.killALife.scale.setTo(0.5, 0.5);
		this.killALife.anchor.setTo(0.5, 0.5);

		var backArrow = this.add.button(this.world.width*1.5/20-30, this.world.height*1/20+10, 'back', this.goBack, this);
		backArrow.anchor.setTo(0.5, 0.5);
		// backArrow.scale.setTo(0.05, 0.05);

		var pause = this.add.button(this.world.width*2.4/20-30, this.world.height*1/20+10, 'pause', this.pauseGame, this);
		pause.anchor.setTo(0.5, 0.5);
		// pause.scale.setTo(0.05, 0.05);

		this.upCamp = this.add.button(this.world.width/20, this.world.height*7/20 + 410, 'upgrade', this.upgradeCamp, this);
		this.upCamp.anchor.setTo(0.5, 0.5);

		this.upWare = this.add.button(this.world.width*19/20, this.world.height*7/20 + 415, 'upgrade', this.upgradeWare, this);
		this.upWare.anchor.setTo(0.5, 0.5);

		this.scores = 0;

		scoreText = this.add.bitmapText(this.world.width*14/20, this.world.height/20, 'lastmileFont', 'Scores: ' + this.scores);

		// Time events: run the addPopulation function in every 1 minute;
		// For testing purpose, the time is set to 1 seconds;

		this.time.events.loop(Phaser.Timer.SECOND * 20, this.camp.consumeItems, this);
		this.time.events.loop(Phaser.Timer.SECOND * 120, this.addPopulation, this);
		this.time.events.loop(Phaser.Timer.SECOND * 20, this.warehouse.refillStock, this);
		// this.time.events.loop(Phaser.Timer.SECOND * 2, this.camp.consumeItems, this);

		// console.log(this);
		// this.time = new Time(this);
		// this.oldTime = time.now;
	},

	// Back to Menu state
	goBack: function () {
		'use strict';
		this.game.state.start('menu');
	},

	pauseGame: function () {
		'use strict';

		// if (!gamePause) {
		// 	this.game.paused = true;
		// 	gamePause = true;

		// }
		// else {
		// 	this.game.paused = false;
		// 	gamePause = false;
		// }
	},

	update: function () {
		'use strict';
		// console.log(this);
		// var currTime = this.time.now;
		// var delta = currTime - this.oldTime;
		// this.oldTime = currTime;
		// console.log(delta);
		scoreText.setText('Score: ' + this.scores);

		this.warehouse.stock[0].setText(this.warehouse.items.num[0]);
		this.warehouse.stock[1].setText(this.warehouse.items.num[1]);
		this.warehouse.stock[2].setText(this.warehouse.items.num[2]);
		this.warehouse.stock[3].setText(this.warehouse.items.num[3]);
		this.warehouse.stock[4].setText(
			this.warehouse.items.num[0] + this.warehouse.items.num[1] + this.warehouse.items.num[2] + this.warehouse.items.num[3] + '/'
			+ this.warehouse.items.num[4]);

		this.camp.stock[0].setText(this.camp.items.num[0]);
		this.camp.stock[1].setText(this.camp.items.num[1]);
		this.camp.stock[2].setText(this.camp.items.num[2]);
		this.camp.stock[3].setText(this.camp.items.num[3]);
		this.camp.storageText.setText(this.camp.items.num[0] + this.camp.items.num[1] + this.camp.items.num[2] + this.camp.items.num[3] + '/' + this.camp.storage);
		this.camp.campPopulation.setText(this.camp.population);

		for (var i = 0; i < 3; i++) {
			this.transports.stock[i].setText(this.transports.options[i].nowHave / 100 + '/' + this.transports.options[i].storage/100);
		}

	},

	addPopulation: function () {
		'use strict';
		this.camp.population += 1000;
		this.scores += 1000;
		// this.add.tween(scoreText).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
	},

	upgradeCamp: function () {
		'use strict';
		this.camp.storage += 500;
		// this.add.tween(this.upCamp).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
	},

	upgradeWare: function () {
		'use strict';
		this.warehouse.items.num[4] += 1000;
	},

	render: function () {
		'use strict';
		this.game.debug.body(this.camp);
	}
};

module.exports = playState;

},{"../obj/camp":2,"../obj/transports":3,"../obj/warehouse":4}]},{},[1])