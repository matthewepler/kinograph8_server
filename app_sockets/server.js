// server.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var K = require('./kinograph');

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
        console.log('pushit rcvd');
    });
});

http.listen(8080, function() {
    console.log('listening on *:8080');
});
