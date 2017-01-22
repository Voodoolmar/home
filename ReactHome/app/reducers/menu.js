"use strict";
var Menu_1 = require('../model/Menu');
var ImmutableDescriptor_1 = require('../framework/ImmutableDescriptor');
var ConstantsNavbar = require('../constants/menu/Navbar');
var ConstantsSidebar = require('../constants/menu/Sidebar');
exports.__esModule = true;
exports["default"] = function (state, action) {
    if (state === void 0) { state = new Menu_1["default"](); }
    if (action === void 0) { action = null; }
    switch (action.type) {
        case 'Set_Menu_State':
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.state; }, action.newMenuState)
                .toObject();
        case ConstantsSidebar.TOGGLE_MENU_MINIFY_STATE:
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.state; }, state.state === Menu_1.MenuState.Full ? Menu_1.MenuState.Minified : Menu_1.MenuState.Full)
                .toObject();
        case ConstantsNavbar.TOGGLE_MENU_HIDDEN_STATE:
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.state; }, state.state === Menu_1.MenuState.Full ? Menu_1.MenuState.Hidden : Menu_1.MenuState.Full)
                .toObject();
        default:
            return state;
    }
};
//# sourceMappingURL=menu.js.map