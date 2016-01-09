// server.js

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var path = require('path');
var exec = require('child_process').exec;
var fs = require('fs');

server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));


var K = require('./kinograph');
var GPIO = require('onoff').Gpio,
    lamp = new GPIO(23, 'out'),
    gate = new GPIO(26, 'in', 'falling');
var verbose = true;


K.init();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('lamp', function() {
        if(K.lamp.on == false) {
            lamp.write(1);
            K.lamp.on = true;
        } else {
            lamp.write(0);
            K.lamp.on = false;
        }
        if(verbose) console.log("K.lamp.on: %s, lamp pin val: %s", K.lamp.on, lamp.readSync());
    });
    socket.on('frame', function() {
        captureFrame();
    });
	socket.on('sharpness', function(data) {
		console.log(data);
	});
});


var counter = 0;
function captureFrame() {
    lamp.write(1);
    K.lamp.on=true;
    var frame = exec(buildExecString(), 
			function(err, stdout, stderr) {
                    if (err) throw err;
                    exec('kill ' + frame.pid);
					counter += 1;
					lamp.write(0);
    				K.lamp.on=false;
                    console.log(counter + " frames saved");
            });
	
	}
 
function buildExecString() {
	var tmpString = 'raspistill -n -o ' + __dirname + '/public/frames/' + Date.now() + '.jpg';
	for (var x in K.camera) {
		if (K.camera.hasOwnProperty(x)) {
			tmpString += ' --' + x + ' ' + K.camera[x];
		}
	}
	if (verbose) console.log(tmpString);
	return tmpString;
}

// turn motor. 
// when gate falls (1 -> 0) captureFrame
// when captureFrame is complete, turn motor

var prevGateState;
gate.watch( function(err, value) {
    if (err) {
        throw err;
    }
	// falling edge 
	if (value == 0 && value !== prevGateState) {
		// stop motor
		captureFrame();
		if (verbose) console.log("gate fallin");
	}
	prevGateState = value;
});


function exit() {
    lamp.unexport();
    gate.unexport();
    process.exit();
}
process.on('SIGINT', exit);
