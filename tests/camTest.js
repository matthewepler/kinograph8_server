var RaspiCam = require('raspicam');
var camera = new RaspiCam(
		{
			"mode" : "photo",
    			"output" : "/home/pi/kinograph/output/image%d",
    			"timeout" : 1000,
    			"encoding" : "jpg"
		}
	);


camera.on("started", function(){
	console.log("started...");	
});

camera.on("read", function(err, filename){
	console.log("read...");
	if (err) console.log(err);
	if (filename) console.log("file created: ", filename);
});

camera.on("exited", function() {
	console.log("exited...");
});

camera.start();
//camera.stop();

