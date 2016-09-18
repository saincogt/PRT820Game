var camp = function () {
	this.food = 0;
	this.water = 0;

	this.items = [];

	this.items.push(this.food);
	this.items.push(this.water);

};

var myCamp = new camp();
myCamp.food = 100;
console.log(myCamp.food);
console.log(myCamp.items);