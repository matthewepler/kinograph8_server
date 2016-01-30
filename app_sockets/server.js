// server.js
var verbose = true;
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
        if(verbose) console.log("\nK.lamp.on: %s, lamp pin val: %s", K.lamp.on, lamp.readSync());
    });
    
	socket.on('frame', function() {
		captureFrame( function(data) {
			socket.emit('newFrame', data);	
		});
    });
	
	socket.on('update', function(data) {
		var name = data['name'];
		var val  = data['value'];
		if (verbose) console.log("\nSettings update: " + name + ", " + val);
		if (K.camera.hasOwnProperty( name )) {
			K.camera[ name ] = val;
		}
		if (verbose) console.log("\nK.camera settings =");
		if (verbose) console.log(K.camera);
	});
});


var counter = 0;
function captureFrame(callback) {
    lamp.write(1);
    K.lamp.on=true;
    var frame = exec(buildExecString(), 
			function(err, stdout, stderr) {
                    if (err) throw err;
                    exec('kill ' + frame.pid);
					counter += 1;
					lamp.write(0);
    				K.lamp.on=false;
                    if(verbose) console.log("\nCaptureFrame(): " + counter + " frames saved");
					sendNewFrame(callback);
            });	
}
 
function sendNewFrame(callback) {
	var filenameStr = '';
	fs.readdir(__dirname +"/public/frames/", function(err, items) {
		if (!err) {
			filenameStr = items[items.length-1];
		} else {
			throw err;
			filenameStr = "ERROR LOADING FILE."
		}

		if (verbose) console.log("\nReturned from sendNewFrame(): " + filenameStr);
		callback( {filename: '/frames/' + filenameStr} );
	});
}

function buildExecString() {
	var tmpString = 'raspistill -n -o ' + __dirname + '/public/frames/' + Date.now() + '.jpg';
	for (var x in K.camera) {
		if (K.camera.hasOwnProperty(x)) {
			tmpString += ' --' + x + ' ' + K.camera[x];
		}
	}
	if (verbose) console.log("\nReturned from buildExecString(): " + tmpString);
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
		if (verbose) console.log("\ngate fallin");
	}
	prevGateState = value;
});


function exit() {
	console.log("Exiting Kinograph");
    lamp.unexport();
    gate.unexport();
    process.exit();
}
process.on('SIGINT', exit);
