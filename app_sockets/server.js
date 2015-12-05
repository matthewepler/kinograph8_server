// server.js

var express = require('express');
var app = express();
var K = require('./kinograph');

K.init();

app.get('/', function(req, res) {
    res.send("hello there");
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening @ http://%s:%s", host, port);
});
