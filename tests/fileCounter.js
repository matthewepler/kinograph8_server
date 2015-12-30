var fs = require('fs');

function readDir() {
    fs.readdir("./", function(err, items) {
       console.log("items.length = " + items.length);
       if(err) {console.log(err)}; 
    });
}

readDir();
