"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var UpdateExpense = (function (_super) {
    __extends(UpdateExpense, _super);
    function UpdateExpense() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'Expense'));
    }
    return UpdateExpense;
}(Query_1["default"]));
exports.UpdateExpense = UpdateExpense;
exports.__esModule = true;
exports["default"] = new UpdateExpense();
//# sourceMappingURL=updateExpense.js.map