var bootState = function (game) {
	console.log("Now the 'boot' state starts!");
}

bootState.prototype = {
	preload: function () {
		this.game.load.image('play', 'assets/img/play.png');
	},
	create: function () {
		var playImg = this.game.add.image(this.world.width/2, this.world.height/2, 'play');
		this.stage.backgroundColor = "#FFA";
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;

		var startButton = this.game.add.button(300, 300, 'play', this.load, this);
		// this.startButton.anchor.setTo(0.5, 0.5);
		playImg.scale.setTo(0.1, 0.1);
		// this.scale.setScreenSize();
		// this.game.state.start('play');
	},
	load: function () {
		this.game.state.start('play');
	}
};