"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var getBaseList = (function (_super) {
    __extends(getBaseList, _super);
    function getBaseList() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'EntityTypes'));
    }
    //TODO::Test
    getBaseList.prototype.get = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([
                    { name: 'Обогатительная', id: 'obogatitelnya' },
                    { name: 'Богдана-Хмельницкого', id: 'bogdana-khmelnitsky' },
                    { name: 'Гоголя', id: 'gogolya' }
                ]);
            }, 100);
        });
    };
    return getBaseList;
}(Query_1["default"]));
exports.getBaseList = getBaseList;
exports.__esModule = true;
exports["default"] = new getBaseList();
//# sourceMappingURL=getBaseList.js.map