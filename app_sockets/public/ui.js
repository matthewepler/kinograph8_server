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


/* sliders setup */
$(function() {
	$("#sharpness-slider").slider({
		value: 0,
		min: -100,
		max: 100,
		step: 10,
		slide: function(event, ui) {
			$("#sharpness-amount").val(ui.value);
		}
	});
	$("#sharpness-amount").val($("#sharpness-slider").slider("value"));
});

/* sliders event emitters */

var thisTarget = null;
$(".settings").mousedown( function(e) {
	thisTarget = $(e.target).parent().attr('id');
});
$(document).mouseup( function(e) {
	if (thisTarget !== null) {
		var thisValue = $("#" + thisTarget).s.ider("value");
		socket.emit('update', {name: thisTarget, value: thisValue});
		thisTarget = null;
	}
});	


