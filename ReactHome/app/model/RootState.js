"use strict";
var Config_1 = require('./Config');
var Error_1 = require('./Error');
var Menu_1 = require('./Menu');
var MainCache_1 = require('./cache/MainCache');
var PlanView_1 = require('./plan/PlanView');
var Report_1 = require('./reports/Report');
var References_1 = require('./reference/References');
var RootState = (function () {
    function RootState(config, error, menu, plan, cache, reports, references) {
        if (config === void 0) { config = new Config_1["default"](); }
        if (error === void 0) { error = new Error_1["default"](); }
        if (menu === void 0) { menu = new Menu_1["default"](); }
        if (plan === void 0) { plan = new PlanView_1["default"](); }
        if (cache === void 0) { cache = new MainCache_1["default"](); }
        if (reports === void 0) { reports = new Report_1["default"](); }
        if (references === void 0) { references = new References_1["default"](); }
        this.config = config;
        this.error = error;
        this.menu = menu;
        this.plan = plan;
        this.cache = cache;
        this.reports = reports;
        this.references = references;
    }
    return RootState;
}());
exports.__esModule = true;
exports["default"] = RootState;
//# sourceMappingURL=RootState.js.map