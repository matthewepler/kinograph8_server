var express = require('express');
var K = require('./kinograph');

var app = express();
K.init();

app.get("/", function(req, res) {
    res.end("hello there");
});

app.listen(8080);
