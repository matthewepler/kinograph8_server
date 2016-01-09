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
});


var pid = '';
var counter = 0;
var prevFiles = 0;
var currFiles = 0;
function captureFrame() {
    lamp.write(1);
    K.lamp.on=true;

    fs.readdir(__dirname + '/public/frames/', function(err, items) {
        if(err) {
            console.log("readdir err!" + err);
            return;
        } else {
            currFiles = items.length;
            console.log("currFiles = " + currFiles);
        }
    }); 
    console.log(Date.now());
    var frame = exec('raspistill -n -t 1 -o ' + __dirname + '/public/frames/' + Date.now() + '.jpg', 
                function(err, stdout, stderr) {
                    if(err) return;
                    exec('kill ' + frame.pid);
                    console.log("frame saved");
                    console.log(Date.now());
                });
    
    lamp.write(0);
    K.lamp.on=false;
}
 

// turn motor. 
// when gate falls (1 -> 0) captureFrame
// when captureFrame is complete, turn motor

var prevGateState;
gate.watch( function(err, value) {
    if (err) {
        throw err;
    }
	// if gate is not the same as it was
	if (value == 0 && value !== prevGateState) {
	//	value == 0 ? console.log("gate = 0") : console.log("gate = 1");
		console.log("take a picture, ma");
	}
	prevGateState = value;
});


function exit() {
    lamp.unexport();
    gate.unexport();
    process.exit();
}
process.on('SIGINT', exit);
