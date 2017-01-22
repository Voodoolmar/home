"use strict";
var ImmutableDescriptor_1 = require('../framework/ImmutableDescriptor');
var Report_1 = require('../model/reports/Report');
var Constants = require('../constants/reports/Reports');
exports.__esModule = true;
exports["default"] = function (state, action) {
    if (state === void 0) { state = new Report_1["default"](); }
    if (action === void 0) { action = null; }
    switch (action.type) {
        case Constants.CHANGE_PERIOD:
            var newDate = ImmutableDescriptor_1["default"](state.filter)
                .set(function (x) { return x.period; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.filter; }, newDate)
                .toObject();
        case Constants.SET_REPORT_ITEMS:
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.items; }, action.value)
                .toObject();
        case Constants.CHANGE_FETCHING:
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.fetching; }, action.value)
                .toObject();
        case Constants.CHANGE_QUERY:
            var newQuery = ImmutableDescriptor_1["default"](state.filter)
                .set(function (x) { return x.query; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.filter; }, newQuery)
                .toObject();
        case Constants.CHANGE_ENTITY:
            var newEntity = ImmutableDescriptor_1["default"](state.filter)
                .set(function (x) { return x.entityId; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.filter; }, newEntity)
                .toObject();
        case Constants.CHANGE_ENTYITY_TYPE:
            var newEntityType = ImmutableDescriptor_1["default"](state.filter)
                .set(function (x) { return x.entityType; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.filter; }, newEntityType)
                .toObject();
        case Constants.CHANGE_SELECT_BASE:
            var newSelectBase = ImmutableDescriptor_1["default"](state.filter)
                .set(function (x) { return x.selectBase; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.filter; }, newSelectBase)
                .toObject();
        case Constants.CHANGE_TYPE_REPORT:
            var filterTypeReport = ImmutableDescriptor_1["default"](state.filter)
                .set(function (x) { return x.typeReport; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.filter; }, filterTypeReport)
                .toObject();
        default:
            return state;
    }
};
//# sourceMappingURL=reports.js.map