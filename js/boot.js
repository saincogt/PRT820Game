var bootState = function (game) {
	console.log("Now the 'boot' state starts!");
}

bootState.prototype = {
	preload: function () {
		var startScreenLabel = game.add.text(300, 40, 'Last Mile', {font: '50px Times New Roman', fill: '#000'});
		var loadingLabel = game.add.text(300, 260, 'Loading...', {font: '30px Courier', fill: '#000'});
		this.game.load.image('play', 'assets/img/play.png');
	},
	create: function () {
		// var playImg = this.game.add.image(this.world.width/2, this.world.height/2, 'play');
		this.stage.backgroundColor = "#FF0";
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;

		var startButton = this.game.add.button(300, 300, 'play', this.startPlay, this);
		startButton.scale.setTo(0.3, 0.3);
		// this.startButton.anchor.setTo(0.5, 0.5);
		// playImg.scale.setTo(0.1, 0.1);
		// this.scale.setScreenSize();
		// this.game.state.start('play');
	},
	startPlay: function () {
		this.game.state.start('play');
	}
};