var serial = require("./serial");

serial.onData(function(data){
    console.log(data);
});

serial.onOpen(function() {
    console.log('started');
    serial.write('started')
});