/* socket setup */
var socket = io();

$("#lamp").click( function() {
	socket.emit('lamp');
});
$("#frame").click( function() {
	socket.emit('frame');
	//$("#image").attr('src', "");
	$("#image").attr('data-spinner', '{radius: 50}');
});

socket.on('newFrame', function(data) {
	console.log('newFrame', data.filename);
	$("#image").css('visibility', 'hidden');
	$("#image").attr('src', data.filename);
});
// NOTE: ideally, we keep an array of images for comparison. Up to 3?


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

/* form event emitters */
$(".form-settings").on("selectmenuchange", function(e, ui) {
	socket.emit('update', {name: $(e.target).attr('id'), value: ui.item.value});
});


/* Behaviors */

$("#image").on("load", function() {
	console.log("image loaded.")
	$("#image").css('visibility', 'visible');
});

