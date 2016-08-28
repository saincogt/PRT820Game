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

	},
	create: function () {
		'use strict';
		this.add.image(0, 0, 'background');

		this.camp = new Camp(this.game, this.world.width/8, this.world.centerY);
		this.game.add.existing(this.camp);

		this.transports = new Transports(this.game);
		this.game.add.existing(this.transports);

		this.warehouse = new Warehouse(this.game, this.world.width*7/8, this.world.centerY - 20);
		this.game.add.existing(this.warehouse);

		// var loadingzone = this.game.add.image(this.world.width*7/8, this.world.centerY+150, 'loadingzone');
		// loadingzone.anchor.setTo(0.5, 0.5);
		// loadingzone.scale.setTo(0.16, 0.16);

		this.killALife = this.add.button(this.world.width/2+ 100, 60, 'failed', this.camp.lossLife, this);
		this.killALife.scale.setTo(0.5, 0.5);
		this.killALife.anchor.setTo(0.5, 0.5);

		var backArrow = this.add.button(this.world.width*1.5/20, this.world.height*18/20, 'back', this.goBack, this);
		backArrow.anchor.setTo(0.5, 0.5);
		// backArrow.scale.setTo(0.05, 0.05);

		var pause = this.add.button(this.world.width*2.4/20, this.world.height*18.05/20, 'pause', this.pauseGame, this);
		pause.anchor.setTo(0.5, 0.5);
		// pause.scale.setTo(0.05, 0.05);

		this.scores = 0;

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

	addPopulation: function () {
		'use strict';
		this.camp.population += 1000;
		// this.add.tween(this.scoreText).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
	},

	render: function () {
		'use strict';
		this.game.debug.body(this.camp);
	}
};

module.exports = playState;
