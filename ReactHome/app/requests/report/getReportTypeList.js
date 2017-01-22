"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var GetReportTypeListQuery = (function (_super) {
    __extends(GetReportTypeListQuery, _super);
    function GetReportTypeListQuery() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'EntityTypes'));
    }
    //TODO::Test
    GetReportTypeListQuery.prototype.get = function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve([
                    { name: 'Отчет по базе', id: 'report-base' },
                    { name: 'Общий отчет', id: 'report-common' },
                    { name: 'Главный отчет', id: 'report-main' }
                ]);
            }, 100);
        });
    };
    return GetReportTypeListQuery;
}(Query_1["default"]));
exports.GetReportTypeListQuery = GetReportTypeListQuery;
exports.__esModule = true;
exports["default"] = new GetReportTypeListQuery();
//# sourceMappingURL=getReportTypeList.js.map