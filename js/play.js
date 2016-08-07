var playState = function (game) {
	console.log("Now starts the Play State!");
}

playState.prototype = {
	preload: function () {
		this.load.image('airdrop', 'assets/img/airdrop.png');
		this.load.image('background', 'assets/img/background.jpg');
		this.load.image('camp', 'assets/img/camp-1.png');
		this.load.image('convoy', 'assets/img/convoy.png');
		this.load.image('food', 'assets/img/food.png');
		this.load.image('porter', 'assets/img/porter.png');
		this.load.image('shelter', 'assets/img/shelter.png');
		this.load.image('warehouse', 'assets/img/warehouse-1.png');
		// this.load.image('poplulation', 'assets/img/population.png');
		// this.load.image('score', 'assets/img/scoreBoard.png');
		this.load.image('back', 'assets/img/backArrow.png');
		this.load.image('pause', 'assets/img/pause.png');
		this.load.image('waterBox', 'assets/img/waterBox.png');
		this.load.image('foodBox', 'assets/img/foodBox.png');
		this.load.image('medicineBox', 'assets/img/medicineBox.png');
		this.load.image('shelterBox', 'assets/img/shelterBox.png');
		this.load.bitmapFont('lastmileFont', 'assets/img/font.png', 'assets/img/font.fnt');
		this.load.image('heartOutline', 'assets/img/heart-outline.png');
		this.load.image('heartIcon', 'assets/img/heart-icon.png');

		this.load.image('truck', 'assets/img/truck.png');
		this.load.image('plane', 'assets/img/plane.png');
	},
	create: function () {
		this.add.image(0, 0, 'background');
		var warehouse = this.add.image(this.world.width*7/8, this.world.centerY, 'warehouse');
		var camp = this.add.image(this.world.width/8, this.world.centerY, 'camp');
		// var population = this.add.image(this.world.width/20, this.world.height/20, 'poplulation');
		// var score = this.add.image(this.world.width*15/20, this.world.height/20, 'score');

		var backArrow = this.add.button(this.world.width*1.5/20, this.world.height*18/20, 'back', this.goBack, this);
		backArrow.scale.setTo(0.05, 0.05);
		backArrow.anchor.setTo(0.5, 0.5);

		var pause = this.add.button(this.world.width*2.4/20, this.world.height*18.05/20, 'pause', this.pauseGame, this);
		pause.scale.setTo(0.05, 0.05);
		pause.anchor.setTo(0.5, 0.5);

		warehouse.anchor.setTo(0.5, 0.5);
		warehouse.scale.setTo(0.2, 0.2);
		camp.anchor.setTo(0.5, 0.5);
		camp.scale.setTo(0.2, 0.2);

		var foodBox = this.add.image(this.world.width*12/20, this.world.height*3.5/20, 'foodBox');
		foodBox.anchor.setTo(0.5, 0.5);
		foodBox.scale.setTo(0.4, 0.4);
		foodBox.inputEnabled = true;
		foodBox.input.enableDrag();

		var waterBox = this.add.image(this.world.width*13.5/20, this.world.height*3.5/20, 'waterBox');
		waterBox.anchor.setTo(0.5, 0.5);
		waterBox.scale.setTo(0.4, 0.4);
		waterBox.inputEnabled = true;
		waterBox.input.enableDrag();

		var medicineBox = this.add.image(this.world.width*15/20, this.world.height*3.5/20, 'medicineBox');
		medicineBox.anchor.setTo(0.5, 0.5);
		medicineBox.scale.setTo(0.4, 0.4);
		medicineBox.inputEnabled = true;
		medicineBox.input.enableDrag();

		var shelterBox = this.add.image(this.world.width*16.5/20, this.world.height*3.5/20, 'shelterBox');
		shelterBox.anchor.setTo(0.5, 0.5);
		shelterBox.scale.setTo(0.4, 0.4);
		shelterBox.inputEnabled = true;
		shelterBox.input.enableDrag();

		var population = 1000;
		var scores = 50000;

		var populationText = this.add.bitmapText(this.world.width/20, this.world.height/20,'lastmileFont', 'Population: ' + population, 20);
		var scoreText = this.add.bitmapText(this.world.width*15/20, this.world.height/20, 'lastmileFont', 'Scores: ' + scores, 20);
		var heartOutline = this.add.image(this.world.width*10/20, this.world.height/20, 'heartOutline');
		var heartIcon = this.add.image(this.world.width*10/20, this.world.height/20, 'heartIcon');
		heartOutline.scale.setTo(0.1, 0.1);
		heartOutline.anchor.setTo(0.5, 0.5);
		heartIcon.scale.setTo(0.1, 0.1);
		heartIcon.anchor.setTo(0.5, 0.5);
		heartIcon.inputEnabled = true;
		heartIcon.input.enableDrag();

		var truck = this.add.sprite(this.world.width*7/8-180, this.world.centerY+100, 'truck');
		truck.scale.setTo(0.07, 0.07);
		truck.anchor.setTo(0.5, 0.5);

		var tween = this.add.tween(truck);
		tween.to({x: this.world.width/8}, 40000, 'Linear', true, 0);


		var plane = this.add.sprite(this.world.width*7/8-180, this.world.centerY+50, 'plane');
		plane.scale.setTo(0.1, 0.1);
		plane.anchor.setTo(0.5, 0.5);
		this.add.tween(plane).to({x: [this.world.width/2, this.world.width/8], y: [this.world.centerY-50, this.world.centerY+70]}, 5000, Phaser.Easing.Quadratic.InOut, true, 0);

	},
	goBack: function () {
		this.game.state.start('boot');
	},
	pauseGame: function () {
		// body...
	}
};

