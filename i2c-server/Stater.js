'use strict';


var debounceTime = 20;
var multiclickTime = 250;
var longClickTime = 1000;


var Stater = function (pin) { this.pin = pin; }
Stater.prototype._clickCallback = function () { };
Stater.prototype._doubleClickCallback = function () { };
Stater.prototype._longClickCallback = function () { };

Stater.prototype.clickCount = 0;
Stater.prototype.lastBounceTime = 0;
Stater.prototype.lastState = false;
Stater.prototype.depressed = false;

Stater.prototype.update = function (btnState) {
    var now = new Date().getTime();
    if (btnState != this.lastState) this.lastBounceTime = now;
    
    if (now - this.lastBounceTime > debounceTime && btnState != this.depressed) {
        this.depressed = btnState;
        if (this.depressed) {
            this.clickCount++;
        }
    }

    if (!this.depressed && (now - this.lastBounceTime) > multiclickTime) {
        if (this.clickCount === 1) {
            this._clickCallback(this.pin);
        } else if (this.clickCount === 2) {
            this._doubleClickCallback(this.pin);
        }
        this.clickCount = 0;
    }

    if (this.depressed && (now - this.lastBounceTime > longClickTime)) {
        this._longClickCallback(this.pin);
        this.clickCount = 0;
    }

    this.lastState = btnState;
}

Stater.prototype.onClick = function (callback) {
    this._clickCallback = callback;
}

Stater.prototype.onDoubleClick = function (callback) {
    this._doubleClickCallback = callback;
}

Stater.prototype.onLongClick = function (callback) {
    this._longClickCallback = callback;
}

module.exports = Stater;