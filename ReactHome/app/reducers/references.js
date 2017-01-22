"use strict";
var ImmutableDescriptor_1 = require('../framework/ImmutableDescriptor');
var References_1 = require('../model/reference/References');
var Constants = require('../constants/reference/Reference');
exports.__esModule = true;
exports["default"] = function (state, action) {
    if (state === void 0) { state = new References_1["default"](); }
    if (action === void 0) { action = null; }
    switch (action.type) {
        case Constants.CHANGE_MODE:
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.mode; }, action.value)
                .toObject();
        // case Constants.SET_POSITION_LIST:
        // 	var newListPositionsListItems = Mutate(state.referenceList.positions)
        // 		.set(x => x.list,action.value)
        // 		.toObject();
        // 	var newPositionsListItems = Mutate(state.referenceList)
        // 		.set(x => x.positions,newListPositionsListItems)
        // 		.toObject();
        // 	return Mutate(state)
        // 		.set(x => x.referenceList,newPositionsListItems)
        // 		.toObject();
        // case Constants.SET_POSITION_DETAILS:
        // 	var newPositionsDetails = Mutate(state.referenceList.positions)
        // 		.set(x => x.details,action.value)
        // 		.toObject();
        // 	var newReferenceListDetails = Mutate(state.referenceList)
        // 		.set(x => x.positions,newPositionsDetails)
        // 		.toObject();
        // 	return Mutate(state)
        // 		.set(x => x.referenceList,newReferenceListDetails)
        // 		.toObject();
        // case Constants.CHANGE_POSITIONS_SELECT_ITEM:
        // 	var newFilterSelectItem = Mutate(state.referenceList.positions.list.filter)
        // 		.set(x => x.selectItem,action.value)
        // 		.toObject();
        // 	var newListFilterSelectItem = Mutate(state.referenceList.positions.list)
        // 		.set(x => x.filter,newFilterSelectItem)
        // 		.toObject();
        // 	var newPositionsListFilterSelectItem = Mutate(state.referenceList.positions)
        // 		.set(x => x.list,newListFilterSelectItem)
        // 		.toObject();
        // 	var newRefListPosListFilterSelect = Mutate(state.referenceList)
        // 		.set(x => x.positions,newPositionsListFilterSelectItem)
        // 		.toObject();
        // 	return Mutate(state)
        // 		.set(x => x.referenceList,newRefListPosListFilterSelect)
        // 		.toObject();
        // case Constants.CHANGE_POSITIONS_PAGE:
        // 	var newPosPaginatorPage = Mutate(state.referenceList.positions.list.filter.paginator)
        // 		.set(x => x.current,action.value)
        // 		.toObject();
        // 	var newFilterPosPaginator = Mutate(state.referenceList.positions.list.filter)
        // 		.set(x => x.paginator,newPosPaginatorPage)
        // 		.toObject();
        // 	var newListPaginatorPos = Mutate(state.referenceList.positions.list)
        // 		.set(x => x.filter,newFilterPosPaginator)
        // 		.toObject();
        // 	var newPosListPaginatorPos = Mutate(state.referenceList.positions)
        // 		.set(x => x.list,newListPaginatorPos)
        // 		.toObject();
        // 	var newRefListPosPaginatorPagePos = Mutate(state.referenceList)
        // 		.set(x => x.positions,newPosListPaginatorPos)
        // 		.toObject();
        // 	return Mutate(state)
        // 		.set(x => x.referenceList,newRefListPosPaginatorPagePos)
        // 		.toObject();
        // case Constants.SET_DEPARTMENTS_LIST:
        // 	var newListDepartmentsListItems = Mutate(state.referenceList.departments)
        // 		.set(x => x.list,action.value)
        // 		.toObject();
        // 	var newDepartmentsListItems = Mutate(state.referenceList)
        // 		.set(x => x.departments,newListDepartmentsListItems)
        // 		.toObject();
        // 	return Mutate(state)
        // 		.set(x => x.referenceList,newDepartmentsListItems)
        // 		.toObject();
        // case Constants.SET_DEPARTMENTS_DETAILS:
        // 	var newDepartmentsDetails = Mutate(state.referenceList.departments)
        // 		.set(x => x.details,action.value)
        // 		.toObject();
        // 	var newReferenceListDepDetails = Mutate(state.referenceList)
        // 		.set(x => x.departments, newDepartmentsDetails)
        // 		.toObject();
        // 	return Mutate(state)
        // 		.set(x => x.referenceList,newReferenceListDepDetails)
        // 		.toObject();
        // case Constants.CHANGE_DEPARTMENTS_PAGE:
        // 	var newDepPage = Mutate(state.referenceList.departments.list.filter.paginator)
        // 		.set(x => x.current,action.value)
        // 		.toObject();
        // 	var depFilterPage = Mutate(state.referenceList.departments.list.filter)
        // 		.set(x => x.paginator,newDepPage)
        // 		.toObject();
        // 	var depListPage = Mutate(state.referenceList.departments.list)
        // 		.set(x => x.filter,depFilterPage)
        // 		.toObject();
        // 	var depPage = Mutate(state.referenceList.departments)
        // 		.set(x => x.list,depListPage)
        // 		.toObject();
        // 	var depRefListPage = Mutate(state.referenceList)
        // 		.set(x => x.departments,depPage)
        // 		.toObject();
        // 	return Mutate(state)
        // 		.set(x => x.referenceList,depRefListPage)
        // 		.toObject();
        case Constants.SET_EXPENSES_LIST:
            var newListExpListItems = ImmutableDescriptor_1["default"](state.referenceList.expense)
                .set(function (x) { return x.list; }, action.value)
                .toObject();
            var newDepartmentsListItems = ImmutableDescriptor_1["default"](state.referenceList)
                .set(function (x) { return x.expense; }, newListExpListItems)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.referenceList; }, newDepartmentsListItems)
                .toObject();
        case Constants.SET_EXPENSES_DETAILS:
            var newDetailsExp = ImmutableDescriptor_1["default"](state.referenceList.expense)
                .set(function (x) { return x.details; }, action.value)
                .toObject();
            var newRefListDetailsExp = ImmutableDescriptor_1["default"](state.referenceList)
                .set(function (x) { return x.expense; }, newDetailsExp)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.referenceList; }, newRefListDetailsExp)
                .toObject();
        case Constants.SET_EXPENSES_CREATE:
            var newCreateExp = ImmutableDescriptor_1["default"](state.referenceList.expense)
                .set(function (x) { return x.create; }, action.value)
                .toObject();
            var newRefListCreateExp = ImmutableDescriptor_1["default"](state.referenceList)
                .set(function (x) { return x.expense; }, newCreateExp)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.referenceList; }, newRefListCreateExp)
                .toObject();
        case Constants.SET_EXPENSE_NEW_NAME:
            var createExpenseNewName = ImmutableDescriptor_1["default"](state.referenceList.expense.create)
                .set(function (x) { return x.name; }, action.value)
                .toObject();
            var newCreateExp = ImmutableDescriptor_1["default"](state.referenceList.expense)
                .set(function (x) { return x.create; }, createExpenseNewName)
                .toObject();
            var newRefListCreateExp = ImmutableDescriptor_1["default"](state.referenceList)
                .set(function (x) { return x.expense; }, newCreateExp)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.referenceList; }, newRefListCreateExp)
                .toObject();
        case Constants.SET_EXPENSE_NEW_VIRTUAL:
            var createExpenseNewName = ImmutableDescriptor_1["default"](state.referenceList.expense.create)
                .set(function (x) { return x.virtual; }, action.value)
                .toObject();
            var newCreateExp = ImmutableDescriptor_1["default"](state.referenceList.expense)
                .set(function (x) { return x.create; }, createExpenseNewName)
                .toObject();
            var newRefListCreateExp = ImmutableDescriptor_1["default"](state.referenceList)
                .set(function (x) { return x.expense; }, newCreateExp)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.referenceList; }, newRefListCreateExp)
                .toObject();
        case Constants.SET_PAGINATOR:
            var newFilterPag = ImmutableDescriptor_1["default"](state.referenceList.expense.list.filter)
                .set(function (x) { return x.paginator; }, action.value)
                .toObject();
            var newListPag = ImmutableDescriptor_1["default"](state.referenceList.expense.list)
                .set(function (x) { return x.filter; }, newFilterPag)
                .toObject();
            var newExpPag = ImmutableDescriptor_1["default"](state.referenceList.expense)
                .set(function (x) { return x.list; }, newListPag)
                .toObject();
            var newRefListPag = ImmutableDescriptor_1["default"](state.referenceList)
                .set(function (x) { return x.expense; }, newExpPag)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.referenceList; }, newRefListPag)
                .toObject();
        default:
            return state;
    }
};
//# sourceMappingURL=references.js.map