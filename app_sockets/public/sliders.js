/* slider setup */
/* slider names must match keys in Kinograph camera object */

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

	$("#brightness").slider({
		value: 50,
		min: 0,
		max: 100,
		step: 5,
		slide: function(event, ui) {
			$("#brightness-amount").val(ui.value);
		}
	});
	$("#brightness-amount").val($("#brightness").slider("value"));

	$("#saturation").slider({
		value: 0,
		min: -100,
		max: 100,
		step: 10,
		slide: function(event, ui) {
			$("#saturation-amount").val(ui.value);
		}
	});
	$("#saturation-amount").val($("#saturation").slider("value"));

	$("#ISO").slider({
		value: 400,
		min: 100,
		max: 800,
		step: 50,
		slide: function(event, ui) {
			$("#ISO-amount").val(ui.value);
		}
	});
	$("#ISO-amount").val($("#ISO").slider("value"));

	$("#ev").slider({
		value: 0,
		min: -10,
		max: 10,
		step: 1,
		slide: function(event, ui) {
			$("#ev-amount").val(ui.value);
		}
	});
	$("#ev-amount").val($("#ev").slider("value"));

	/* form-settings */
	$("#exposure").selectmenu({
		change: function(event, ui) {
			$("#exposure-amount").val(ui.item.value);
		}	
	});
	$("#exposure-amount").val("fixedfps");
	// delete these lines? I'm not sure what they're doing...
	// maybe setting the orange text for the first time, before there's a change...oh, that makes sense. 

	$("#awb").selectmenu({
		change: function(event, ui) {
			$("#awb-amount").val(ui.item.value);
		}	
	});
	$("#awb-amount").val("off");


/* end */
});


