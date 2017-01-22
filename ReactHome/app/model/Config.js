"use strict";
var Config = (function () {
    function Config(phone, token, externalUserId, css, crid, isFrame) {
        if (phone === void 0) { phone = ''; }
        if (token === void 0) { token = ''; }
        if (externalUserId === void 0) { externalUserId = ''; }
        if (css === void 0) { css = ''; }
        if (crid === void 0) { crid = ''; }
        if (isFrame === void 0) { isFrame = false; }
        this.phone = phone;
        this.token = token;
        this.externalUserId = externalUserId;
        this.css = css;
        this.crid = crid;
        this.isFrame = isFrame;
    }
    return Config;
}());
exports.__esModule = true;
exports["default"] = Config;
//# sourceMappingURL=Config.js.map