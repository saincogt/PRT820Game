var myCamp = function () {
	// body...
};

myCamp.prototype.assets = {
	one: '1',
	two: '2',
	three: '3'
};

var example = new myCamp();

for (var i in example.assets) {
	console.log(i);
	console.log(example.assets[i]);
}