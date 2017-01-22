"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Query_1 = require('../../framework/Query');
var serviceHostGetter_1 = require('../../framework/serviceHostGetter');
var CreateExpense = (function (_super) {
    __extends(CreateExpense, _super);
    function CreateExpense() {
        _super.call(this, serviceHostGetter_1["default"]('Billing', 'Expense'));
    }
    return CreateExpense;
}(Query_1["default"]));
exports.CreateExpense = CreateExpense;
exports.__esModule = true;
exports["default"] = new CreateExpense();
//# sourceMappingURL=createExpense.js.map