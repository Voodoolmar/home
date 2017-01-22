"use strict";
var ImmutableDescriptor_1 = require('../framework/ImmutableDescriptor');
var MainCache_1 = require('../model/cache/MainCache');
var Constants = require('../constants/plan/Cache');
exports.__esModule = true;
exports["default"] = function (state, action) {
    if (state === void 0) { state = new MainCache_1["default"](); }
    if (action === void 0) { action = null; }
    switch (action.type) {
        case Constants.SET_VALUE_IN_CACHE:
            return ImmutableDescriptor_1["default"](state)
                .update(function (x) { return x.lists; }, function (x) { return x.push(action.value); })
                .toObject();
        case Constants.CHANGE_VALUE_BY_KEY:
            return ImmutableDescriptor_1["default"](state)
                .update(function (x) { return x.lists; }, function (x) { return x.map(function (z) {
                if (z.key === action.value.key) {
                    return action.value;
                }
                else {
                    return z;
                }
            }).toList(); })
                .toObject();
        default:
            return state;
    }
};
//# sourceMappingURL=cache.js.map