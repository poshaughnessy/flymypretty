var RollingSpider = require("rolling-spider");
var rollingSpider = new RollingSpider();
var readline = require('readline');

console.log('Connecting...');

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

rollingSpider.connect(function() {
	rollingSpider.setup(function() {
		rollingSpider.flatTrim();
		rollingSpider.startPing();
		rollingSpider.flatTrim();
		console.log('Connected to drone', rollingSpider.name);
	    });
    });

function takeOff() {
    console.log('take off');
    rollingSpider.takeOff();
    rollingSpider.flatTrim();
}

function land() {
    console.log('land');
    rollingSpider.land();
}

var flying = false;

process.stdin.on('keypress', function(str, key) {

    console.log('on keypress', str, key);

    if (key && key.ctrl && key.name == 'c') {
	process.exit();
    }

    if (flying) {
	land();
    } else {
	takeOff();
    }

});
