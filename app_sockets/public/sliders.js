/* slider setup */

$(function() {
	$("#sharpness").slider({
		value: 0,
		min: -100,
		max: 100,
		step: 10,
		slide: function(event, ui) {
			$("#sharpness-amount").val(ui.value);
		}
	});
	$("#sharpness-amount").val($("#sharpness").slider("value"));

	$("#contrast").slider({
		value: 0,
		min: -100,
		max: 100,
		step: 10,
		slide: function(event, ui) {
			$("#contrast-amount").val(ui.value);
		}
	});
	$("#contrast-amount").val($("#contrast").slider("value"));

/* end */
});


