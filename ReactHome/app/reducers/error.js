"use strict";
var Error_1 = require('../model/Error');
var ImmutableDescriptor_1 = require('../framework/ImmutableDescriptor');
exports.__esModule = true;
exports["default"] = function (state, action) {
    if (state === void 0) { state = new Error_1["default"](); }
    if (action === void 0) { action = null; }
    switch (action.type) {
        case 'Error':
            return ImmutableDescriptor_1["default"](state).set(function (x) { return x.message; }, action.value).toObject();
        default:
            return state;
    }
};
//# sourceMappingURL=error.js.map