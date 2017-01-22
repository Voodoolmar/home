"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var getNameEntityList = (function (_super) {
    __extends(getNameEntityList, _super);
    function getNameEntityList() {
        // super(serviceHostGetter('TaxiPro', 'Users', configuration => {
        //   var conf = !configuration ? "staging." : configuration == "production" ? "" : (configuration + ".");
        //   return conf + "globaxi.ru";
        // }));
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'Entity'));
    }
    return getNameEntityList;
}(Query_1["default"]));
exports.getNameEntityList = getNameEntityList;
exports.__esModule = true;
exports["default"] = new getNameEntityList();
//# sourceMappingURL=getNameEntityList.js.map