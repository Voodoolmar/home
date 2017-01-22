"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var GetEntryListQuery = (function (_super) {
    __extends(GetEntryListQuery, _super);
    function GetEntryListQuery() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'Entry'));
    }
    return GetEntryListQuery;
}(Query_1["default"]));
exports.GetEntryListQuery = GetEntryListQuery;
exports.__esModule = true;
exports["default"] = new GetEntryListQuery();
//# sourceMappingURL=getListEntries.js.map