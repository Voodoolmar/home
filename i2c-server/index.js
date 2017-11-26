'use strict';
var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');
var port = process.env.PORT || 3000;
var Device = require('./Device');
var Gpio = require('onoff').Gpio;

var status = require("./status");
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};
var server = http.createServer(function (req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), "public", uri);
    fs.exists(filename, function(exists) {        
        if(!path.extname(filename)) {
            filename += "index.html"
        }
        else if(!exists) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write('404 Not Found\n');
            res.end();
            return;
        }
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        res.writeHead(200, {'Content-Type':mimeType} );

        var fileStream = fs.createReadStream(filename);
        fileStream.pipe(res);

    }); //end path.exists
}).listen(port);

var io = require('socket.io').listen(server);
io.on('connection', function(socket){
    socket.emit("init", status);
    socket.on("set", function(data){
        updateStatus(data);
        socket.broadcast.emit('set', data);
    })
});

function getRoomAndLightByPin(pin){
    for(var i in status){
        for(var j in status[i].lights){
            if(status[i].lights[j].pin == pin){
                return {
                    roomId: i,
                    lightId: j,
                    status: status[i].lights[j].status
                }
            }
        }
    }
}

var led = new Gpio(25, 'out');
led.writeSync(1);

var device = new Device(0x20);
device.onClick(function(pin){
    console.log(pin)
    var light = getRoomAndLightByPin(pin);
    var newData = {
        roomId: light.roomId,
        lightId: light.lightId,
        status: !light.status
    };
    io.emit("set", newData);
    updateStatus(newData);
})

function updateStatus(data){
    var light = status[data.roomId].lights[data.lightId]
    var value = data.status != undefined 
        ? data.status
        : !light.status
    light.status = value;

    //TODO::переделать
    if(light.pin >=0 && light.pin <8){
        device.setPin(light.pin, value);
    }
}

console.log("started")


var i2cBus = require("i2c-bus");
var Pca9685Driver = require("pca9685").Pca9685Driver;
 
var options = {
    i2c: i2cBus.openSync(1),
    address: 0x40,
    frequency: 1600,
    debug: false
};
var pwm = new Pca9685Driver(options, function(err) {
    if (err) {
        console.error("Error initializing PCA9685");
        process.exit(-1);
    }
    console.log("Initialization done");
    var counter = 0;
    setInterval(function(){
        pwm.setDutyCycle(0, counter/100);
        counter++;
        if(counter > 100) counter = 0;
    }, 100)
});