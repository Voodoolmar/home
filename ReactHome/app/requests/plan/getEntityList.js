"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../typings/tsd.d.ts" />
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var GetEntityListQuery = (function (_super) {
    __extends(GetEntityListQuery, _super);
    function GetEntityListQuery() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'EntityTypes'));
    }
    //TODO::Test
    GetEntityListQuery.prototype.get = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([
                    { name: 'Водитель', id: 'driver' },
                    { name: 'Авто', id: 'auto' },
                    { name: 'Водитель-авто', id: 'driver-auto' },
                    { name: 'База', id: 'plan-base' }
                ]);
            }, 100);
        });
    };
    return GetEntityListQuery;
}(Query_1["default"]));
exports.GetEntityListQuery = GetEntityListQuery;
exports.__esModule = true;
exports["default"] = new GetEntityListQuery();
//# sourceMappingURL=getEntityList.js.map