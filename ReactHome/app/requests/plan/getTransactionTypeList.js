"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var getTransactionTypeList = (function (_super) {
    __extends(getTransactionTypeList, _super);
    function getTransactionTypeList() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'EntityTypes'));
    }
    //TODO::Test
    getTransactionTypeList.prototype.get = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([
                    { id: 'expense', name: 'Расход' },
                    { id: 'expenseMaintenance', name: 'Расход ТО' },
                    { id: 'incoming', name: 'Приход' },
                    { id: 'incoming-without-debt', name: 'Приход без долга' }
                ]);
            }, 5000);
        });
    };
    return getTransactionTypeList;
}(Query_1["default"]));
exports.getTransactionTypeList = getTransactionTypeList;
exports.__esModule = true;
exports["default"] = new getTransactionTypeList();
//# sourceMappingURL=getTransactionTypeList.js.map