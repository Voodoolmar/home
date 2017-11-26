'use strict';
var MCP23017 = require('./MCP23017');
var Stater = require('./Stater');
var staters = [];

var Device = function (address) {
    var mcp = this.mcp = new MCP23017({
        address: 0x20, //default: 0x20
        device: '/dev/i2c-1', // '/dev/i2c-1' on model B | '/dev/i2c-0' on model A
        debug: true //default: false
    });

    for (var i = 0; i < 16; i++) {
        if (i < 8) {
            mcp.pinMode(i, mcp.OUTPUT);
        } else {
            mcp.pinMode(i, mcp.INPUT); //if you want them to be inputs
            var stater = new Stater(i-8);
            var device = this;
            stater.onClick(function(x){device._clickCallback(x)});
            stater.onDoubleClick(function(x){device._doubleClickCallback(x)})
            stater.onLongClick(function(x){device._longClickCallback(x)})
            staters.push(stater)
        }
    }

    setInterval(function () {
        // mcp.digitalReadARegister(function (err, res) {        });
        mcp.digitalReadBRegister(function (err, res) {
            for (var i = 0; i < 8; i++) {
                var pinHexMask = Math.pow(2, i);
                staters[i].update((res & pinHexMask) === pinHexMask);
            }
        });
    }, 10);
    console.log("device initialized")
};
Device.prototype._clickCallback = function () { };
Device.prototype._doubleClickCallback = function () { };
Device.prototype._longClickCallback = function () { };

Device.prototype.onClick = function (callback) {
    this._clickCallback = callback;
}

Device.prototype.onDoubleClick = function (callback) {
    this._doubleClickCallback = callback;
}

Device.prototype.onLongClick = function (callback) {
    this._longClickCallback = callback;
}
Device.prototype.setPin = function(pin, state){    
    this.mcp.digitalWrite(pin, state); //set GPIO A Pin 0 to state LOW
}

module.exports = Device;