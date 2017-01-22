"use strict";
var ExecutionEnvironment_1 = require('./ExecutionEnvironment');
var serviceHostGetter = function (service, method, hostGetter) {
    if (hostGetter === void 0) { hostGetter = null; }
    var protocol = 'http';
    var host = '';
    if (!hostGetter) {
        host = ExecutionEnvironment_1.canUseDom ? window['__VIRTUAL_HOST__'] : process.env.VIRTUAL_HOST;
    }
    else {
        host = hostGetter(ExecutionEnvironment_1.canUseDom ? window['__CONFIGURATION__'] : process.env.CONFIGURATION);
    }
    return protocol + "://" + host + "/" + service + "/" + method;
};
exports.__esModule = true;
exports["default"] = serviceHostGetter;
//# sourceMappingURL=serviceHostGetter.js.map