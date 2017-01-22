"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var DeleteExpense = (function (_super) {
    __extends(DeleteExpense, _super);
    function DeleteExpense() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'Expense'));
    }
    return DeleteExpense;
}(Query_1["default"]));
exports.DeleteExpense = DeleteExpense;
exports.__esModule = true;
exports["default"] = new DeleteExpense();
//# sourceMappingURL=deleteExpense.js.map