var app = require('http').createServer(handler),
    url = require('url'),
    fs = require('fs'),
    io = require('socket.io').listen(app);

app.listen(5000);

io.sockets.on('connection', function(socket) {
    conosle.log("sockets connected...");
    socket.on('ping', function(data) {
        console.log('ping');
        delay = data["duration"];
        setTimeout(function(){
            socket.emit("pong");
        }, delay*1000);
    });
});

function handler(req, res) {
    var path = url.parse(req.url).pathname;

    if (path == '/') {
        index = fs.readFile(__dirname + '/public/index.html',
                function(error, data) {
                    if (error) {
                        res.writeHead(500);
                        return res.end("Error: unable to load index.html");
                    }

                    res.writeHead(200, { 'Content-Type' : 'text/html' });
                    res.end(data);
                });
    }
}
