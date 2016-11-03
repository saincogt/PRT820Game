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
