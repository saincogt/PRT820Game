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
		this.load.image('poplulation', 'assets/img/population.png');
		this.load.image('score', 'assets/img/scoreBoard.png');
		this.load.image('back', 'assets/img/backArrow.png');
	},
	create: function () {
		this.stage.backgroundColor = "#FFF";
		this.add.image(0, 0, 'background');
		var warehouse = this.add.image(this.world.width*7/8, this.world.centerY, 'warehouse');
		var camp = this.add.image(this.world.width/8, this.world.centerY, 'camp');
		var population = this.add.image(this.world.width/20, this.world.height/20, 'poplulation');
		var score = this.add.image(this.world.width*15/20, this.world.height/20, 'score');

		var backArrow = this.add.button(this.world.width*1.5/20, this.world.height*18/20, 'back', this.goBack, this);
		backArrow.scale.setTo(0.05, 0.05);
		backArrow.anchor.setTo(0.5, 0.5);

		camp.inputEnabled = true;
		camp.input.enableDrag();
		warehouse.anchor.setTo(0.5, 0.5);
		warehouse.scale.setTo(0.2, 0.2);
		camp.anchor.setTo(0.5, 0.5);
		camp.scale.setTo(0.2, 0.2);
	},
	goBack: function () {
		this.game.state.start('boot');
	}
};

