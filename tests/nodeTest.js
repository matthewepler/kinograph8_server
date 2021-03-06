var keypress = require('keypress');
keypress(process.stdin);

var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

var GPIO = require('onoff').Gpio,
    lever = new GPIO(18, 'in','falling'),
    led   = new GPIO(17, 'out'),
    light = new GPIO(23, 'out');

var preview = false;
var pid = 0;

//console.log = function(d) {
//	log_file.write(util.format(d) + '\n');
//	log_stdout.write(util.format(d) + '\n');
//};

function exit() {
	led.unexport();
	lever.unexport();
	process.exit();
}

lever.watch(function(err, state) {
	led.writeSync(state);
});

process.stdin.on('keypress', function(ch, key) {
	//	console.log('key = ', key);
		if (key && key.ctrl && key.name == 'c') {
			process.exit();
		}
		switch(key.name) {
			case 'p':
				var exec = require('child_process').exec;
			       	preview = !preview;
	//			console.log('preview = ', preview);
				if( preview == true ) {
					light.writeSync(1);
					var cmd = 'raspistill -t 0 -k -p 0,0,400,300 -ISO 500 -awb off -mm matrix -ss 100';
					var result = exec(cmd, function(err, stdout, stderr) {
						if(err)	console.log(err);
						if(stderr) console.log(stderr);
					});
	//				console.log(result.pid);
					pid = result.pid;
				}
				if( preview == false) {
					light.writeSync(0);
					var cmd = 'kill ';
					cmd += pid + 1;
					var result = exec(cmd,  function(err, stdout, stderr, stdin) {
						if(err)	console.log(err);
						if(stderr) console.log(stderr);
					});
	//				console.log(result);

				}
				break;
		}
	}
);

process.stdin.setRawMode(true);
process.stdin.resume();
process.on('SIGINT', exit);
