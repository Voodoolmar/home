var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var port = __dirname.substr(0,2) == "D:" 
                ? "COM3" 
                : "/dev/ttyAMA0";
var serialPort = new SerialPort(port, {
    baudrate: 115200
});

var delegates = [];
var onOpen;
serialPort.on("open", function () {
  console.log('open');
  if(onOpen)onOpen();
    serialPort.on('data', function(array) {
        var data = String.fromCharCode.apply(null, array);
        if(data.substr(0,1))
       {        
            for(var i = 0; i<delegates.length;i++) {
                delegates[i](data);
            }
        }
    });
});

module.exports = {
    write: function(data) {
        serialPort.write(data);
    },
    onData: function(delegate){
        delegates.push(delegate);
    },
    onOpen: function(delegate){
        onOpen = delegate;
    }
}