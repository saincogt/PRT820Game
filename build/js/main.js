(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var menuState = require('./states/menu');
var playState = require('./states/play');

// Author: Sancho
// Create new Phaser game, the element '' is a DOM ID, the game can be inserted the DOM element with this ID.
var game = new Phaser.Game(960, 720, Phaser.AUTO, 'last-mile');

// Added all the states. 'name' is the casual name of the state, they will be used when we call them.
// nameState is the official name, we will use them to define the states.
game.state.add('menu', menuState);
game.state.add('play', playState);

game.state.start('menu');
},{"./states/menu":5,"./states/play":6}],2:[function(require,module,exports){
var lives = 3;
var scores = 50000;
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

	Phaser.Sprite.call(this, game, x, y, 'camp', frame);
	this.name = 'camp';
	this.anchor.setTo(0.5, 0.5);
	this.scale.setTo(0.2, 0.2);


	lives = game.add.group();
	for (var i = 3; i > 0; i--) {
		var playerLife = lives.create(livesLocation.x + 40 * i, livesLocation.y, 'heartIcon');
		playerLife.anchor.setTo(0.5, 0.5);
		playerLife.scale.setTo(0.1, 0.1);
		playerLife.alpha = 1;
	}

	this.items = {
		name: ['food', 'water', 'medicine', 'shelter', 'storage'],
		num: [0, 0, 0, 0, 500],
		rate: [100, 90, 20, 40]
	};

	// Show the stock in the camp;
	for (var k = 0; k < this.items.name.length; k++) {
		game.add.bitmapText(itemTextLocation.x, itemTextLocation.y + 20 * k,
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
			console.log(lives.countLiving());
		}
		if (lives.countLiving() < 1) {
			var gameOver = game.add.bitmapText(game.world.width/2, game.world.height/2,'lastmileFont', 'Game Over!\n Your Score: ' + scores, 20);
			gameOver.anchor.setTo(0.5, 0.5);
			return;
		}

	};
};

Camp.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Camp;

},{}],3:[function(require,module,exports){
'use strict';
var Transports = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	var optionLocation = {
		x: game.world.width * 7 / 8 - 90,
		y: game.world.centerY + 100
	};

	var transName = ['plane', 'truck', 'porter'];
	var options = [];
	var group;

	this.name = 'transports';
	this.plane = {
		food: 100,
		medicine: 100,
		storage: 0,
		commute: 5,
		cooldown: 40
	};
	this.truck = {
		food: 0,
		water: 0,
		medicine: 0,
		shelter: 0,
		storage: 5,
		commute: 20
	};
	this.porter = {
		food: 0,
		water: 0,
		medicine: 0,
		shelter: 0,
		storage: 5,
		commute: 30,
		population: 1000
	};

	group = game.add.group();
	for (var i = 0; i < 3; i++) {
		options[i] = group.create(optionLocation.x, optionLocation.y + 60 * i, transName[i]);
		options[i].anchor.setTo(0.5, 0.5);
		options[i].scale.setTo(0.1, 0.1);
	}

	// Convoy takes 20 seconds, plane 5 seconds, porters 30 seconds to the camp;
	this.sendPlane = function () {
		// Tween the plane 5 seconds;
		var tween = game.add.tween(options[0]);
		tween.to({x: [game.world.width/2, game.world.width/8],
			y: [game.world.centerY-50, game.world.centerY+70]}, 500,
			Phaser.Easing.Quadratic.InOut, true, 0);
		tween.onComplete.add(this.PlaneOnComplete, this);
	};

	this.sendConvoy = function () {
		// Tween the truck 20 seconds;
		var tween = game.add.tween(options[1]);
		tween.to({x: game.world.width/8}, 2000, 'Linear', true, 0);
		tween.onComplete.add(this.ConvoyOnComplete, this);
	};

	this.sendPorters = function () {
		// Tween the porters; 30 seconds
		var tween = game.add.tween(options[2]).to({x: game.world.width/8}, 3000, 'Linear', true, 0);
		tween.onComplete.add(this.PortersOnComplete, this);
	};

	this.PlaneOnComplete = function (game) {
		game.camp.items.num[0] += this.plane.food;
		game.camp.items.num[2] += this.plane.medicine;
		console.log(mycamp.camp.items);
	};

	this.ConvoyOnComplete = function () {
		console.log('Convoy Arrived');
	};

	this.PortersOnComplete = function () {
		console.log('Porters Arrived');
	};

};
Transports.prototype = Object.create(Phaser.Sprite.prototype);
module.exports = Transports;

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict'

var menuState = function (game) {
	// console.log("Now the 'menu' state starts!");
}

menuState.prototype = {
	preload: function () {
		
		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('title', 'src/assets/img/title1.png');
		this.load.image('play', 'src/assets/img/playMenu.png');
		this.load.image('score', 'src/assets/img/scoreMenu.png');
		this.load.bitmapFont('lastmileFont', 'src/assets/font/font.png', 'src/assets/font/font.fnt');
	},
	create: function () {

		var background = this.game.add.image(0, 0, 'background');

		var title = this.game.add.sprite(this.world.centerX, this.world.centerY/2-20, 'title');
		title.anchor.setTo(0.5, 0.5);
		var tween = this.add.tween(title);
		tween.to({y: this.world.width/5+25}, 800, Phaser.Easing.Bounce.Out, true, 500);

		var startButton = this.game.add.button(this.world.centerX, 300, 'play', this.startPlay, this);
		startButton.scale.setTo(0.8, 0.8);
		startButton.anchor.setTo(0.5, 0.5);

		var scoreButton = this.game.add.button(this.world.centerX, 360, 'score', this.checkScore, this);
		scoreButton.scale.setTo(0.8, 0.8);
		scoreButton.anchor.setTo(0.5, 0.5);
		var authorText = this.add.bitmapText(this.world.centerX, 500, 'lastmileFont', 'Developed by Sancho', 20);
		authorText.anchor.setTo(0.5, 0.5);

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
	},
	startPlay: function () {
		this.game.state.start('play');
	},
	checkScore: function () {
		// this.game.state.start('score');
	},
	render: function () {
		// game.debug.game();
	}
};
module.exports = menuState;

},{}],6:[function(require,module,exports){
var playState = function (game) {
	'use strict'
	// console.log("Now starts the Play State!");
};

var Camp = require('../obj/camp');
var Warehouse = require('../obj/warehouse');
var Transports = require('../obj/transports');

var populationText;
var scoreText;
var gamePause = false;


playState.prototype = {
	preload: function () {
		this.load.image('airdrop', 'src/assets/img/airdrop.png');
		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('camp', 'src/assets/img/camp-1.png');
		this.load.image('convoy', 'src/assets/img/convoy.png');
		this.load.image('porter', 'src/assets/img/porter-1.png');
		this.load.image('warehouse', 'src/assets/img/warehouse-1.png');
		this.load.image('back', 'src/assets/img/backArrow.png');
		this.load.image('pause', 'src/assets/img/pause.png');
		this.load.image('water', 'src/assets/img/waterBox.png');
		this.load.image('food', 'src/assets/img/foodBox.png');
		this.load.image('medicine', 'src/assets/img/medicineBox.png');
		this.load.image('shelter', 'src/assets/img/shelterBox.png');
		this.load.bitmapFont('lastmileFont', 'src/assets/font/font.png', 'src/assets/font/font.fnt');
		this.load.image('heartOutline', 'src/assets/img/heart-outline.png');
		this.load.image('heartIcon', 'src/assets/img/heart-icon.png');
		this.load.image('truck', 'src/assets/img/truck.png');
		this.load.image('plane', 'src/assets/img/plane.png');
		this.load.image('goButton', 'src/assets/img/goButton.png');
		this.load.image('waiting', 'src/assets/img/waiting.png');
		this.load.image('loadingzone', 'src/assets/img/loadingzone.png');
		this.load.image('failed', 'src/assets/img/fail.png');

	},
	create: function () {
		this.add.image(0, 0, 'background');

		this.camp = new Camp(this.game, this.world.width/8, this.world.centerY);
		this.game.add.existing(this.camp);

		this.transports = new Transports(this.game);
		this.game.add.existing(this.transports);

		this.warehouse = new Warehouse(this.game, this.world.width*7/8, this.world.centerY);
		this.game.add.existing(this.warehouse);

		var loadingzone = this.game.add.image(this.world.width*7/8, this.world.centerY+150, 'loadingzone');
		loadingzone.anchor.setTo(0.5, 0.5);
		loadingzone.scale.setTo(0.16, 0.16);

		this.goPlane = this.add.button(this.world.width*7/8-180, this.world.centerY+100, 'goButton', this.sendPlane, this);
		this.goPlane.scale.setTo(0.5, 0.5);
		this.goPlane.anchor.setTo(0.5, 0.5);

		this.goConvoy = this.add.button(this.world.width*7/8-180, this.world.centerY+160, 'goButton', this.sendConvoy, this);
		this.goConvoy.scale.setTo(0.5, 0.5);
		this.goConvoy.anchor.setTo(0.5, 0.5);

		this.goPorters = this.add.button(this.world.width*7/8-180, this.world.centerY+220, 'goButton', this.sendPorters, this);
		this.goPorters.scale.setTo(0.5, 0.5);
		this.goPorters.anchor.setTo(0.5, 0.5);

		this.killALife = this.add.button(this.world.width/2+ 100, 60, 'failed', this.camp.lossLife, this);
		this.killALife.scale.setTo(0.5, 0.5);
		this.killALife.anchor.setTo(0.5, 0.5);

		var backArrow = this.add.button(this.world.width*1.5/20, this.world.height*18/20, 'back', this.goBack, this);
		backArrow.scale.setTo(0.05, 0.05);
		backArrow.anchor.setTo(0.5, 0.5);

		var pause = this.add.button(this.world.width*2.4/20, this.world.height*18.05/20, 'pause', this.pauseGame, this);
		pause.scale.setTo(0.05, 0.05);
		pause.anchor.setTo(0.5, 0.5);

		this.scores = 50000;

		populationText = this.add.bitmapText(this.world.width/20, this.world.height/20,'lastmileFont', 'Population: ' + this.camp.population, 20);
		scoreText = this.add.bitmapText(this.world.width*15/20, this.world.height/20, 'lastmileFont', 'Scores: ' + this.scores, 20);

		// Time events: run the addPopulation function in every 1 minute;
		// For testing purpose, the time is set to 1 seconds;

		this.time.events.loop(Phaser.Timer.SECOND * 10, this.addPopulation, this);
		// this.time.events.loop(Phaser.Timer.SECOND * 2, this.camp.consumeItems, this);

		// console.log(this);
		// this.time = new Time(this);
		// this.oldTime = time.now;
	},

	// Back to Menu state
	goBack: function () {
		this.game.state.start('menu');
	},

	pauseGame: function () {

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
		// console.log(this);
		// var currTime = this.time.now;
		// var delta = currTime - this.oldTime;
		// this.oldTime = currTime;
		// console.log(delta);
		populationText.setText('Population: ' + this.camp.population);
		scoreText.setText('Score: ' + this.scores);

		// this.camp.campFoodText.setText('Food: ' + this.camp.food);
		// this.camp.campWaterText.setText('Water: ' + this.camp.water);
		// this.camp.campMedicineText.setText('Medicine: ' + this.camp.medicine);
		// this.camp.campShelterText.setText('Shelter: ' + this.camp.shelter);
		// this.camp.campStorageText.setText('Capacity: ' + this.camp.storage);

		// this.warehouse.warehouseFoodText.setText('Food: ' + this.warehouse.food);
		// this.warehouse.warehouseWaterText.setText('Water: ' + this.warehouse.water);
		// this.warehouse.warehouseMedicineText.setText('Medicine: ' + this.warehouse.medicine);
		// this.warehouse.warehouseShelterText.setText('Shelter: ' + this.warehouse.shelter);
		// this.warehouse.warehouseStorageText.setText('Capacity: ' + this.warehouse.storage);

	},

	// Click the button and start the delivery
	sendPlane: function () {
		this.transports.sendPlane();
		// this.flyThePlane.kill();

		this.goPlane.inputEnabled = false;
		// this.goPlane.kill();
	},

	sendConvoy: function () {
		this.transports.sendConvoy();
		this.goConvoy.inputEnabled = false;
	},

	sendPorters: function () {
		this.transports.sendPorters();
		this.goPorters.inputEnabled = false;
	},

	addPopulation: function () {
		this.camp.population += 1000;
		// this.add.tween(this.scoreText).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
	},

	render: function () {
		this.game.debug.body(this.camp);
	}
};

module.exports = playState;
},{"../obj/camp":2,"../obj/transports":3,"../obj/warehouse":4}]},{},[1])