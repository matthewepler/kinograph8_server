exports.init = function() {
    this.name = "Kinograph alpha!",
    this.camera = { sharpness : 0,         // [-100, 100], default = 0 (-sh, --sharpness)
                    contrast  : 0,         // [-100, 100], default = 0 (-co, --contrast)
                    brightness: 50,        // [0, 100], default = 50   (-br, --brightness)
                    saturation: 0,         // [-100, 100], default = 0 (-sa, --saturation)
                    ISO       : 100,       // [100, 800], default = ?  (-ISO, --ISO)
                    ev        : 0,         // [-10, 10], default = 0
                    exposure  : "fixedfps",// see picam docs for options (-ex, --exposure)
                    awb       : "off",     // see picam docs for options (-awb, --awb)
                    metering  : "matrix",  // see picam docs for options (-mm, --metering)
                    rotation  : 0,         // [0, 359]
                    shutter   : 100,       // [0, 6000] milliseconds, default = ? (-ss, --shutter)
                    drc       : "off",     // [off, low, medium, high], default = off (-drc, --drc)
                    mode      : 2,         // see picam docs for options (-md, --mode)
                    quality   : 100,       // [0, 100], default = ? (-q, --quality)
                    output    : './public/frames/%06d.jpg',// (-o, --output)
                    timeout   : 0,         // default = 5 sec.
                    encoding  : "jpg",     // [jpg, bmp, gif, png] (-e, --encoding)
                    ev        : 0         // [-10, 10], default = 0 (-ev, --ev) exposure compensation
                  },
   this.lamp  = {on : false},
   this.motor = {on : false}
   this.ready = false;
   this.running = false;
    console.log("Kinograph initiated");
};
