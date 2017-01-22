"use strict";
var redux_1 = require('redux');
var react_router_redux_1 = require('react-router-redux');
var config_1 = require('./config');
var error_1 = require('./error');
var menu_1 = require('./menu');
var plan_1 = require('./plan');
var cache_1 = require('./cache');
var reports_1 = require('./reports');
var references_1 = require('./references');
exports.__esModule = true;
exports["default"] = redux_1.combineReducers({
    config: config_1["default"],
    routing: react_router_redux_1.routerReducer,
    error: error_1["default"],
    menu: menu_1["default"],
    plan: plan_1["default"],
    cache: cache_1["default"],
    reports: reports_1["default"],
    references: references_1["default"]
});
//# sourceMappingURL=root.js.map