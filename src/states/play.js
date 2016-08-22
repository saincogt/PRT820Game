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