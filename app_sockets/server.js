// server.js

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var path = require('path');
var exec = require('child_process').exec;
var watch = require('watch');

server.listen(port, function() {
    console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));


var K = require('./kinograph');
var GPIO = require('onoff').Gpio,
    lamp = new GPIO(23, 'out');
var verbose = true;
var procID;

watch.createMonitor(__dirname + '/public/frames', 
        {
            ignoreDotFiles: true,
            ignoreNotPermitted: true,
        }, function(monitor) {
            monitor.on('changed', function(f, curr, prev) {
                console.log("changed: " + f);
            });
            monitor.on('created', function(f, stat) {
                console.log("created: " + f);
            });
        });

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
       if(!K.running) cameraReady(); 
       if(K.running && K.ready) {
           exec("kill -USR1 " + procID);
           // K.ready = false, reset in watch 
       } else {
            console.log("camera not running, no frame captured.");
       }
       if(verbose) console.log("frame!");
    });
});

function cameraReady() {
    lamp.write(1);
    K.lamp.on = true;
    if(K.running) {
         exec('pkill raspistill', function(err, stdout, stderr) {
             if(err) console.log("ERROR (err) w/ pkill in cameraReady() " + err);
             if(stderr) console.log("ERROR (std) w/ pikill in cameraReady() " + stderr);  
         });
    }
    console.log("starting camera...");
    var cmdString = buildCmdString();
    exec(cmdString, function(err, stdout, stderr) {
        if(err) console.log("ERROR (err) initiating cameraReady(): " + err);
        if(stderr) console.log("ERROR (std) initiating cameraRead(): " + stderr);
    });
    K.running = true;
    K.ready = true;
    exec('pgrep raspistill', function(err, stdout, stderr) {
        procID = stdout;
    }); 
}

function buildCmdString() {
    var cmdString = 'raspistill -n -l -th -s'; // no preview, latest link, thumbnail, signal mode
    for (var key in K.camera) {
        cmdString += ' --' + key + ' ' + K.camera[key]; 
    }
    cmdString += " &";
    //if(verbose) console.log(cmdString);
    return cmdString;
}

function exit() {
    lamp.unexport();
    monitor.stop();
    process.exit();
}
process.on('SIGINT', exit);
