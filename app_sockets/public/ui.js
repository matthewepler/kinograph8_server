/* socket setup */
var socket = io();

$("#lamp").click( function() {
	socket.emit('lamp');
});
$("#frame").click( function() {
	socket.emit('frame');
});

socket.on('newFrame', function(data) {
	console.log('newFrame');
	console.log(data);
});


/* sliders event emitters */

var thisTarget = null;
$(".settings").mousedown( function(e) {
	thisTarget = $(e.target).parent().attr('id');
	console.log(thisTarget);
});
$(document).mouseup( function(e) {
	if (thisTarget !== null) {
		var thisValue = $("#" + thisTarget).slider("value");
		console.log(thisValue);
		socket.emit('update', {name: thisTarget, value: thisValue});
		thisTarget = null;
	}
});	


