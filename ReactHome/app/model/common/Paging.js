"use strict";
var Paging = (function () {
    function Paging(current, totalCount) {
        if (current === void 0) { current = 5; }
        if (totalCount === void 0) { totalCount = 5; }
        this.current = current;
        this.totalCount = totalCount;
    }
    return Paging;
}());
exports.__esModule = true;
exports["default"] = Paging;
;
//# sourceMappingURL=Paging.js.map