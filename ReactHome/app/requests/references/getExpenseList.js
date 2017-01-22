"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var GetExpenseList = (function (_super) {
    __extends(GetExpenseList, _super);
    function GetExpenseList() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'Expense'));
    }
    return GetExpenseList;
}(Query_1["default"]));
exports.GetExpenseList = GetExpenseList;
exports.__esModule = true;
exports["default"] = new GetExpenseList();
//# sourceMappingURL=getExpenseList.js.map