"use strict";
(function (MenuState) {
    MenuState[MenuState["Full"] = 0] = "Full";
    MenuState[MenuState["Minified"] = 1] = "Minified";
    MenuState[MenuState["Hidden"] = 2] = "Hidden";
})(exports.MenuState || (exports.MenuState = {}));
var MenuState = exports.MenuState;
var Menu = (function () {
    function Menu(state) {
        if (state === void 0) { state = MenuState.Full; }
        this.state = state;
    }
    return Menu;
}());
exports.__esModule = true;
exports["default"] = Menu;
//# sourceMappingURL=Menu.js.map