"use strict";
var Sorter = (function () {
    function Sorter(direction, field) {
        if (direction === void 0) { direction = null; }
        if (field === void 0) { field = ''; }
        this.direction = direction;
        this.field = field;
    }
    return Sorter;
}());
exports.__esModule = true;
exports["default"] = Sorter;
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
    SortDirection[SortDirection["Descending"] = 1] = "Descending";
})(exports.SortDirection || (exports.SortDirection = {}));
var SortDirection = exports.SortDirection;
//# sourceMappingURL=Sorter.js.map