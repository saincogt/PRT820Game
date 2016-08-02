var playState = function (game) {
	console.log("Now starts the Play State!");
}

playState.prototype = {
	preload: function () {
		this.load.image('airdrop', 'assets/img/airdrop.png');
		this.load.image('background', 'assets/img/background.jpg');
		this.load.image('camp', 'assets/img/camp.png');
		this.load.image('convoy', 'assets/img/convoy.png');
		this.load.image('food', 'assets/img/food.png');
		this.load.image('porter', 'assets/img/porter.png');
		this.load.image('shelter', 'assets/img/shelter.png');
		this.load.image('warehouse', 'assets/img/warehouse.png');
	},
	create: function () {
		this.stage.backgroundColor = "#FFF";
		this.add.image(0, 0, 'background');
		var warehouse = this.add.image(this.world.width*7/8, this.world.centerY, 'warehouse');
		var camp = this.add.image(this.world.width/8, this.world.centerY, 'camp');
		warehouse.anchor.setTo(0.5, 0.5);
		warehouse.scale.setTo(0.2, 0.2);
		camp.anchor.setTo(0.5, 0.5);
		camp.scale.setTo(0.2, 0.2);
	}
};

