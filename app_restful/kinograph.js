exports.init = function() {
    this.name = "Kinograph alpha!",
    this.camera = { sharpness : 0,         // [-100, 100], default = 0 (-sh, --sharpness)
                    contrast  : 0,         // [-100, 100], default = 0 (-co, --contrast)
                    brightness: 50,        // [0, 100], default = 50   (-br, --brightness)
                    saturation: 0,         // [-100, 100], default = 0 (-sa, --saturation)
                    iso       : 100,       // [100, 800], default = ?  (-ISO, --ISO)
                    exposure  : "fixedfps",// see picam docs for options (-ex, --exposure)
                    awb       : "off",     // see picam docs for options (-awb, --awb)
                    imagefx   : null,      // see picam docs for options (-ifx, --imxfx)
                    colorfx   : null,      // see picam docs for options (-cfx, --colfx) <U:V>
                    metering  : "matrix",  // see picam docs for options (-mm, --metering)
                    hflip     : null,      // (-hf, --hflip) 
                    vflip     : null,      // (-vf, --vflip)
                    shutter   : 100,       // [0, 6000] milliseconds, default = ? (-ss, --shutter)
                    dRangeComp: "off",     // [off, low, medium, high], default = off (-drc, --drc)
                    stats     : null,      // (-st, --stats)
                    awbgains  : null,      // ? (-awbg, --awbgains) <Red:Blue>
                    mode      : 2,         // see picam docs for options (-md, --mode)
                    quality   : 100,       // [0, 100], default = ? (-q, --quality)
                    raw       : null,      // (-r, --raw)
                    output    : null,      // (-o, --output)
                    verbose   : null,      // (-v, --verbose)
                    encoding  : "jpg",     // [jpg, bmp, gif, png] (-e, --encoding)
                    exposureC : 0,         // [-10, 10], default = 0 (-ev, --ev) exposure compensation
                    dir       : "output"   // director to which images are saved
                  },
   this.light = {on : false},
   this.motor = {on : false}
};
