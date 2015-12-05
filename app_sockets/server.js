// server.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var K = require('./kinograph');
var GPIO = require('onoff').Gpio,
    lamp = new GPIO(23, 'out');
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
    socket.on('pushit', function() {
        if(K.lamp.on == false) {
            lamp.write(1);
            K.lamp.on = true;
        } else {
            lamp.write(0);
            K.lamp.on = false;
        }
        if(verbose) console.log("K.lamp.on: %s, lamp pin val: %s", K.lamp.on, lamp.readSync());
    });
});

http.listen(8080, function() {
    console.log('listening on *:8080');
});

function exit() {
    lamp.unexport();
    process.exit();
}
process.on('SIGINT', exit);
