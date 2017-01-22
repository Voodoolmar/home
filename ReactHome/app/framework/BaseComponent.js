"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        _super.call(this);
    }
    BaseComponent.prototype._getOwner = function (data) {
        if (!data)
            return null;
        var owner = data._currentElement._owner;
        if (!owner)
            return null;
        if (owner._instance.constructor.name !== "Connect") {
            return owner;
        }
        return this._getOwner(owner);
    };
    //in render function
    BaseComponent.prototype.getComponentPath = function () {
        return this._getComponentPath(this["_reactInternalInstance"]);
    };
    BaseComponent.prototype._getComponentPath = function (data) {
        var path = [];
        var component = data;
        while (component) {
            path.push(component._instance.constructor.name);
            component = this._getOwner(component);
        }
        var result = "";
        for (var i = 0; i < path.length; i++) {
            result = path[i] ? (path[i] + (result ? "." + result : "")) : result;
        }
        return result;
    };
    return BaseComponent;
}(React.Component));
exports.__esModule = true;
exports["default"] = BaseComponent;
//# sourceMappingURL=BaseComponent.js.map