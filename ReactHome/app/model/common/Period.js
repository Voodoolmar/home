"use strict";
var moment = require('moment');
var Period = (function () {
    function Period(from, to, selectDay) {
        if (from === void 0) { from = moment(new Date()).date(1).seconds(0).milliseconds(0).toDate(); }
        if (to === void 0) { to = moment(new Date()).seconds(0).milliseconds(0).toDate(); }
        if (selectDay === void 0) { selectDay = new SelectDay(); }
        this.from = from;
        this.to = to;
        this.selectDay = selectDay;
    }
    return Period;
}());
exports.__esModule = true;
exports["default"] = Period;
var SelectDay = (function () {
    function SelectDay(name, id) {
        if (name === void 0) { name = 'Период'; }
        if (id === void 0) { id = TimeLocation.Custom; }
        this.name = name;
        this.id = id;
    }
    return SelectDay;
}());
exports.SelectDay = SelectDay;
(function (TimeLocation) {
    TimeLocation[TimeLocation["Today"] = 0] = "Today";
    TimeLocation[TimeLocation["Tommorow"] = 1] = "Tommorow";
    TimeLocation[TimeLocation["CurrentWeek"] = 2] = "CurrentWeek";
    TimeLocation[TimeLocation["PrevWeek"] = 3] = "PrevWeek";
    TimeLocation[TimeLocation["CurrentMonth"] = 4] = "CurrentMonth";
    TimeLocation[TimeLocation["PrevMonth"] = 5] = "PrevMonth";
    TimeLocation[TimeLocation["Custom"] = 6] = "Custom";
})(exports.TimeLocation || (exports.TimeLocation = {}));
var TimeLocation = exports.TimeLocation;
//# sourceMappingURL=Period.js.map