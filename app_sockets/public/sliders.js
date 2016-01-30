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

	$("#rotation").slider({ // could be better or could disappear.
		value: 0,
		min: 0,
		max: 360,
		step: 1,
		slide: function(event, ui) {
			$("#rotation-amount").val(ui.value);
		}
	});
	$("#rotation").slider("value", 0);
	$("#rotation-amount").val($("#rotation").slider("value"));

	$("#shutter").slider({ 
		value: 100,
		min: 0,
		max: 1000,
		step: 10,
		slide: function(event, ui) {
			$("#shutter-amount").val(ui.value);
		}
	});
	$("#shutter-amount").val($("#shutter").slider("value"));

	$("#quality").slider({ 
		value: 100,
		min: 0,
		max: 100,
		step: 10,
		slide: function(event, ui) {
			$("#quality-amount").val(ui.value);
		}
	});
	$("#quality-amount").val($("#quality").slider("value"));

		
	/* form-settings */

	$("#exposure").selectmenu({
		change: function(event, ui) {
			$("#exposure-amount").val(ui.item.value);
		}	
	});
	$("#exposure-amount").val("fixedfps");

	$("#awb").selectmenu({
		change: function(event, ui) {
			$("#awb-amount").val(ui.item.value);
		}	
	}); $("#awb-amount").val("off"); 

	$("#metering").selectmenu({
		change: function(event, ui) {
			$("#metering-amount").val(ui.item.value);
		}	
	});
	$("#metering-amount").val("matrix");

	$("#drc").selectmenu({
		change: function(event, ui) {
			$("#drc-amount").val(ui.item.value);
		}	
	});
	$("#drc-amount").val("off");

	$("#mode").selectmenu({
		change: function(event, ui) {
			$("#mode-amount").val(ui.item.value);
		}	
	});
	$("#mode-amount").val("2");

	$("#encoding").selectmenu({
		change: function(event, ui) {
			$("#encoding-amount").val(ui.item.value);
		}	
	});
	$("#encoding-amount").val("jpg");

	/* end */
});


