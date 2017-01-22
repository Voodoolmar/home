"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var getAccountTypeList = (function (_super) {
    __extends(getAccountTypeList, _super);
    function getAccountTypeList() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'EntityTypes'));
    }
    //TODO::Test
    getAccountTypeList.prototype.get = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([
                    { name: 'ТО', id: 'maintenance' },
                    { name: 'Выкуп', id: 'foreclosure' },
                    { name: 'План', id: 'plan' },
                    { name: 'Другое', id: 'other' },
                    { name: 'Общий', id: 'common' },
                    { name: 'Полное ТО', id: 'total-maintenance' },
                    { name: 'Расход', id: 'expense' }
                ]);
            }, 100);
        });
    };
    return getAccountTypeList;
}(Query_1["default"]));
exports.getAccountTypeList = getAccountTypeList;
exports.__esModule = true;
exports["default"] = new getAccountTypeList();
//# sourceMappingURL=getAccountTypeList.js.map