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
},{"./states/menu":6,"./states/play":7}],2:[function(require,module,exports){
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
		console.log(this.water);
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
},{}],3:[function(require,module,exports){
'use strict'

var Items = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

<<<<<<< HEAD
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
=======
	this.showBox = function () {

		var foodBox = game.add.image(game.world.width*15/20, game.world.height*5.5/20, 'foodBox');
		foodBox.anchor.setTo(0.5, 0.5);
		foodBox.scale.setTo(0.4, 0.4);
		foodBox.inputEnabled = true;
		foodBox.input.enableDrag();

		var waterBox = game.add.image(game.world.width*16/20, game.world.height*5.5/20, 'waterBox');
		waterBox.anchor.setTo(0.5, 0.5);
		waterBox.scale.setTo(0.4, 0.4);
		waterBox.inputEnabled = true;
		waterBox.input.enableDrag();

		var medicineBox = game.add.image(game.world.width*17/20, game.world.height*5.5/20, 'medicineBox');
		medicineBox.anchor.setTo(0.5, 0.5);
		medicineBox.scale.setTo(0.4, 0.4);
		medicineBox.inputEnabled = true;
		medicineBox.input.enableDrag();

		var shelterBox = game.add.image(game.world.width*18/20, game.world.height*5.5/20, 'shelterBox');
		shelterBox.anchor.setTo(0.5, 0.5);
		shelterBox.scale.setTo(0.4, 0.4);
		shelterBox.inputEnabled = true;
		shelterBox.input.enableDrag();
<<<<<<< HEAD

		group.onChildInputOver.add(this.onOver, this);
		group.onChildInputOut.add(this.onOut, this);

>>>>>>> parent of 88a02ed... Enabled the updates of items in camp and warehouse. When transportations arrived, add the items to the camp.


	this.onOver = function (sprite) {
		sprite.alpha = 0.8;
	};

	this.onOut = function (sprite) {
		sprite.alpha = 1;
	}

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

=======
	};

>>>>>>> parent of 60f1345... mainly revised transports and items classes
};

Items.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Items;


},{}],4:[function(require,module,exports){
'use strict'

var Transports = function (game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, frame);

	this.truck = game.add.sprite(game.world.width*7/8-180, game.world.centerY+100, 'truck');
	this.truck.scale.setTo(0.06, 0.06);
	this.truck.anchor.setTo(0.5, 0.5);


	this.plane = game.add.sprite(game.world.width*7/8-180, game.world.centerY+50, 'plane');
	this.plane.scale.setTo(0.07, 0.07);
	this.plane.anchor.setTo(0.5, 0.5);

	this.showOptions = function () {
		var tween = game.add.tween(this.truck);
		tween.to({x: game.world.width/8}, 20000, 'Linear', true, 0);
		game.add.tween(this.plane).to({x: [game.world.width/2, game.world.width/8], y: [game.world.centerY-50, game.world.centerY+70]}, 5000, Phaser.Easing.Quadratic.InOut, true, 0);

	};
<<<<<<< HEAD

	this.PlaneOnComplete = function () {
		console.log('Plane Arrived');

		// (-_-;) complicated
		game.state.states.play.camp.food += this.plane.food;
		// game.state.states.play.camp.water += this.plane.water;
		game.state.states.play.camp.medicine += this.plane.medicine;
		// game.state.states.play.camp.shelter += this.plane.shelter;

		// console.log(game.state.states.play.camp.food);
		
	};

	this.ConvoyOnComplete = function () {
		console.log('Convoy Arrived');
		game.state.states.play.camp.food += this.truck.food;
		game.state.states.play.camp.water += this.truck.water;
		game.state.states.play.camp.medicine += this.truck.medicine;
		game.state.states.play.camp.shelter += this.truck.shelter;

	};

	this.PortersOnComplete = function () {
		console.log('Porters Arrived');
		game.state.states.play.camp.food += this.porter.food;
		game.state.states.play.camp.water += this.porter.water;
		game.state.states.play.camp.medicine += this.porter.medicine;
		game.state.states.play.camp.shelter += this.porter.shelter;
		game.state.states.play.camp.population += this.porter.population;

		// console.log(game.state.states.play.camp.population);

	};

=======
>>>>>>> parent of 88a02ed... Enabled the updates of items in camp and warehouse. When transportations arrived, add the items to the camp.
};

Transports.prototype = Object.create(Phaser.Sprite.prototype);

module.exports = Transports;
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
		tween.to({y: this.world.width/5+10}, 1000, Phaser.Easing.Bounce.Out, true, 800);

		var startButton = this.game.add.button(this.world.centerX, 300, 'play', this.startPlay, this);
		startButton.scale.setTo(0.8, 0.8);
		startButton.anchor.setTo(0.5, 0.5);

		var scoreButton = this.game.add.button(this.world.centerX, 360, 'score', this.checkScore, this);
		scoreButton.scale.setTo(0.8, 0.8);
		scoreButton.anchor.setTo(0.5, 0.5);
		var authorText = this.add.bitmapText(this.world.centerX, 500, 'lastmileFont', 'Developed by Sancho', 25);
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

},{}],7:[function(require,module,exports){
'use strict'

var playState = function (game) {
	// console.log("Now starts the Play State!");
};

var Camp = require('../obj/camp');
var Warehouse = require('../obj/warehouse');
var Items = require('../obj/items');
var Transports = require('../obj/transports');

<<<<<<< HEAD
var lives = 3;
var populationText = "";
var scoreText = "";
var gamePause = false;
=======
var lives;
var populationText;
var scoreText;
>>>>>>> parent of 60f1345... mainly revised transports and items classes


playState.prototype = {
	preload: function () {
		this.load.image('airdrop', 'src/assets/img/airdrop.png');
		this.load.image('background', 'src/assets/img/background.jpg');
		this.load.image('camp', 'src/assets/img/camp-1.png');
		this.load.image('convoy', 'src/assets/img/convoy.png');
		this.load.image('food', 'src/assets/img/food.png');
		this.load.image('porter', 'src/assets/img/porter.png');
		this.load.image('shelter', 'src/assets/img/shelter.png');
		this.load.image('warehouse', 'src/assets/img/warehouse-1.png');
		this.load.image('back', 'src/assets/img/backArrow.png');
		this.load.image('pause', 'src/assets/img/pause.png');
		this.load.image('waterBox', 'src/assets/img/waterBox.png');
		this.load.image('foodBox', 'src/assets/img/foodBox.png');
		this.load.image('medicineBox', 'src/assets/img/medicineBox.png');
		this.load.image('shelterBox', 'src/assets/img/shelterBox.png');
		this.load.bitmapFont('lastmileFont', 'src/assets/font/font.png', 'src/assets/font/font.fnt');
		this.load.image('heartOutline', 'src/assets/img/heart-outline.png');
		this.load.image('heartIcon', 'src/assets/img/heart-icon.png');
		this.load.image('truck', 'src/assets/img/truck.png');
		this.load.image('plane', 'src/assets/img/plane.png');
		this.load.image('goButton', 'src/assets/img/goButton.png');
		this.load.image('waiting', 'src/assets/img/waiting.png');
	},
	create: function () {
		this.add.image(0, 0, 'background');

		this.camp = new Camp(this.game, this.world.width/8, this.world.centerY);
		this.game.add.existing(this.camp);
<<<<<<< HEAD
=======

>>>>>>> parent of 60f1345... mainly revised transports and items classes
		this.warehouse = new Warehouse(this.game, this.world.width*7/8, this.world.centerY);
		this.game.add.existing(this.warehouse);

		this.items = new Items(this.game);
		this.game.add.existing(this.items);
		this.items.showBox();

		this.transports = new Transports(this.game);
		this.game.add.existing(this.transports);

		this.goButton = this.add.button(this.world.width*7/8-180, this.world.centerY, 'goButton', this.flyThePlane, this);
		this.goButton.scale.setTo(0.5, 0.5);
		this.goButton.anchor.setTo(0.5, 0.5);

		this.killALife = this.add.button(this.world.width*7/8-180, this.world.centerY-100, 'goButton', this.failedToSatisfy, this);
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
		
<<<<<<< HEAD
=======
		// this.camp.expandStorage();
		this.camp.showStock();

		// this.warehouse.expandStorage();
		this.warehouse.showStock();
>>>>>>> parent of 88a02ed... Enabled the updates of items in camp and warehouse. When transportations arrived, add the items to the camp.

		lives = this.add.group();
		for (var i = 3; i > 0; i--) {
			var playerLife = lives.create(this.world.width/2 - 100 + (40 * i), 60, 'heartIcon');
			playerLife.anchor.setTo(0.5, 0.5);
			playerLife.scale.setTo(0.1, 0.1);
			playerLife.alpha = 1;
		};

<<<<<<< HEAD
		this.items = new Items(this.game);
		this.game.add.existing(this.items);
		// this.items.showBox();

=======
>>>>>>> parent of 88a02ed... Enabled the updates of items in camp and warehouse. When transportations arrived, add the items to the camp.
		// Time events: run the addPopulation function in every 1 minute;
		this.time.events.loop(Phaser.Timer.SECOND * 3, this.addPopulation, this);

		// console.log(this);
		// this.time = new Time(this);
		// this.oldTime = time.now;
	},

	// Back to Menu state
	goBack: function () {
		this.game.state.start('menu');
	},

	pauseGame: function () {
		// body...
	},

	update: function () {
		// console.log(this);
		// var currTime = this.time.now;
		// var delta = currTime - this.oldTime;
		// this.oldTime = currTime;
		// console.log(delta);
	
	},

	// Click the button and start the delivery
	flyThePlane: function () {
		this.transports.showOptions();
		// this.flyThePlane.kill();
	},

	checkLife: function () {
		
	},

	// Player will have 3 'lives', failed to satisfy the consumption will lose one 'life';
	failedToSatisfy: function () {
		var live = lives.getFirstAlive();
		if (live) {
			live.kill();
		};

		// If the player have less than 1 life, then game will be over;
		if (lives.countLiving() < 1) {
			var gameOver = this.add.bitmapText(this.world.width/2, this.world.height/2,'lastmileFont', 'Game Over!\n Your Score:' + this.scores, 20);
			gameOver.anchor.setTo(0.5, 0.5);
			// this.killALife.kill();
		};
	},

	addPopulation: function () {
		this.camp.population += 1000;
		// this.add.tween(this.scoreText).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
		populationText.setText('Population: ' + this.camp.population);
	},

	render: function () {
		this.game.debug.body(this.transports.plane);
	}
};

module.exports = playState;
},{"../obj/camp":2,"../obj/items":3,"../obj/transports":4,"../obj/warehouse":5}]},{},[1])