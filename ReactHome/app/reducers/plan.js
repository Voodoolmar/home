"use strict";
var PlanView_1 = require('../model/plan/PlanView');
var ImmutableDescriptor_1 = require('../framework/ImmutableDescriptor');
var ConstantsList = require('../constants/plan/List');
var ConstantsDetails = require('../constants/plan/Details');
exports.__esModule = true;
exports["default"] = function (state, action) {
    if (state === void 0) { state = new PlanView_1["default"](); }
    if (action === void 0) { action = null; }
    switch (action.type) {
        case ConstantsList.SET_LIST_PAGE:
            var pageList = ImmutableDescriptor_1["default"](state.list.paging)
                .set(function (x) { return x.current; }, action.value)
                .toObject();
            var listFromPaging = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.paging; }, pageList)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, listFromPaging)
                .toObject();
        case ConstantsDetails.SET_DETAILS_PAGE:
            var pageDetails = ImmutableDescriptor_1["default"](state.details.paging)
                .set(function (x) { return x.current; }, action.value)
                .toObject();
            var detailsFromPaging = ImmutableDescriptor_1["default"](state.details)
                .set(function (x) { return x.paging; }, pageDetails)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.details; }, detailsFromPaging)
                .toObject();
        case ConstantsList.CHANGE_LIST_FILTER_QUERY:
            var query = ImmutableDescriptor_1["default"](state.list.filter)
                .set(function (x) { return x.query; }, action.value)
                .toObject();
            var listFromFilter = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.filter; }, query)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, listFromFilter)
                .toObject();
        case ConstantsDetails.SET_PERIOD:
            var detailsFilterPeriod = ImmutableDescriptor_1["default"](state.details.filter)
                .set(function (x) { return x.period; }, action.value)
                .toObject();
            var detailsFilter = ImmutableDescriptor_1["default"](state.details)
                .set(function (x) { return x.filter; }, detailsFilterPeriod)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.details; }, detailsFilter)
                .toObject();
        case ConstantsList.CHANGE_STATE_LIST_MODAL:
            var showListModal = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.isShow; }, !state.list.modal.isShow)
                .toObject();
            var listModal = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, showListModal)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, listModal)
                .toObject();
        case ConstantsDetails.CHANGE_STATE_DETAILS_MODAL:
            var showDetailsModal = ImmutableDescriptor_1["default"](state.details.modal)
                .set(function (x) { return x.isShow; }, !state.details.modal.isShow)
                .toObject();
            var detailsModal = ImmutableDescriptor_1["default"](state.details)
                .set(function (x) { return x.modal; }, showDetailsModal)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.details; }, detailsModal)
                .toObject();
        case ConstantsList.SET_ACCOUNT:
            var newList = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.items; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return state.list; }, newList)
                .toObject();
        case ConstantsList.SET_ENTITY_TYPE:
            var entityTypeFilter = ImmutableDescriptor_1["default"](state.list.filter)
                .set(function (x) { return x.entityType; }, action.value)
                .toObject();
            var listFilter = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.filter; }, entityTypeFilter)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, listFilter)
                .toObject();
        case ConstantsList.SET_ACCOUNT_TYPES:
            var filterAccountTypes = ImmutableDescriptor_1["default"](state.list.filter)
                .set(function (x) { return x.accountType; }, action.value)
                .toObject();
            var listFilterAccountTypes = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.filter; }, filterAccountTypes)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, listFilterAccountTypes)
                .toObject();
        case ConstantsDetails.SET_LIST_ENTRIES:
            var newEntry = ImmutableDescriptor_1["default"](state.details)
                .set(function (x) { return x.items; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.details; }, newEntry)
                .toObject();
        case ConstantsDetails.SET_SELECTED_ACCOUNT_ITEM:
            var selectAccountItem = ImmutableDescriptor_1["default"](state.details.filter)
                .set(function (x) { return x.accountType; }, action.value.accountType)
                .set(function (x) { return x.entityId; }, action.value.entityId)
                .toObject();
            var newSelected = ImmutableDescriptor_1["default"](state.details)
                .set(function (x) { return x.filter; }, selectAccountItem)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.details; }, newSelected)
                .toObject();
        case ConstantsList.SET_SELECTED_ACCOUNT_ID:
            var selectItem = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.selected; }, action.value)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, selectItem)
                .toObject();
        case ConstantsList.SET_SELECTED_ENTITY_ID:
            var selectEnitity = ImmutableDescriptor_1["default"](state.list.filter)
                .set(function (x) { return x.entityId; }, action.value)
                .toObject();
            var updateFilter = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.filter; }, selectEnitity)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, updateFilter)
                .toObject();
        case ConstantsDetails.SET_MAX_COUNT_DETAILS:
            var maxCount = ImmutableDescriptor_1["default"](state.details.paging)
                .set(function (x) { return x.totalCount; }, action.value)
                .toObject();
            var paging = ImmutableDescriptor_1["default"](state.details)
                .set(function (x) { return x.paging; }, maxCount)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.details; }, paging)
                .toObject();
        case ConstantsList.CHANGE_LIST_MAX_PAGE:
            var maxPageList = ImmutableDescriptor_1["default"](state.list.paging)
                .set(function (x) { return x.totalCount; }, action.value)
                .toObject();
            var newPaging = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.paging; }, maxPageList)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newPaging)
                .toObject();
        case ConstantsList.CHANGE_REQUIRE:
            var require = ImmutableDescriptor_1["default"](state.list.filter)
                .set(function (x) { return x.require; }, action.value)
                .toObject();
            var newFilter = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.filter; }, require)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newFilter)
                .toObject();
        case ConstantsList.CHANGE_AMOUNT_SORTER:
            var newFilterFromAmount = ImmutableDescriptor_1["default"](state.list.filter)
                .set(function (x) { return x.fromAmount; }, action.value.from)
                .set(function (x) { return x.toAmount; }, action.value.to)
                .toObject();
            var newListFromAmount = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.filter; }, newFilterFromAmount)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListFromAmount)
                .toObject();
        case ConstantsList.CHANGE_SORTER:
            var filterFromAsceding = ImmutableDescriptor_1["default"](state.list.filter)
                .set(function (x) { return x.sorter; }, action.value)
                .toObject();
            var listAscending = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.filter; }, filterFromAsceding)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, listAscending)
                .toObject();
        case ConstantsList.SET_ENTITY_NAME_DRIVER_AUTO_MODAL:
            var newModalFilterEntites = ImmutableDescriptor_1["default"](state.list.modal.filter)
                .set(function (x) { return x.driverAutoQuery; }, action.value)
                .toObject();
            var newModalEntites = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.filter; }, newModalFilterEntites)
                .toObject();
            var newListEntitiesModal = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalEntites)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListEntitiesModal)
                .toObject();
        case ConstantsList.SET_VALUES_ACCOUNTS_TYPES_MODAL:
            var newModalValuesAccountsTypes = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.valuesAccountsTypes; }, action.value.origin)
                .set(function (x) { return x.copyValuesAccountsTypes; }, action.value.copy)
                .toObject();
            var newListValuesAccountsTypes = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalValuesAccountsTypes)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListValuesAccountsTypes)
                .toObject();
        case ConstantsList.SET_DESCRIPTION_MODAL:
            var newModalDescription = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.description; }, action.value)
                .toObject();
            var newListDescriptionModal = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalDescription)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListDescriptionModal)
                .toObject();
        case ConstantsList.CHANGE_FETCHING_MODAL:
            var newModalFetching = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.fetching; }, action.value)
                .toObject();
            var newListFetchingModal = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalFetching)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListFetchingModal)
                .toObject();
        case ConstantsList.SET_MESSAGE_MODAL:
            var newMessage = ImmutableDescriptor_1["default"](state.list.modal.message)
                .set(function (x) { return x.type; }, action.value.type)
                .set(function (x) { return x.value; }, action.value.message)
                .toObject();
            var newModalMessage = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.message; }, newMessage)
                .toObject();
            var newListMessageModal = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalMessage)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListMessageModal)
                .toObject();
        case ConstantsList.SET_TYPE_TRANSACTIONS_LIST_MODAL:
            var newModalFilterTypeTransactions = ImmutableDescriptor_1["default"](state.list.modal.filter)
                .set(function (x) { return x.typeTransactions; }, action.value)
                .toObject();
            var newModalTypeTransactions = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.filter; }, newModalFilterTypeTransactions)
                .toObject();
            var newListModalTypeTransactions = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalTypeTransactions)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListModalTypeTransactions)
                .toObject();
        case ConstantsList.SET_SELECTION_BASE:
            var newModalFilterSelectBase = ImmutableDescriptor_1["default"](state.list.modal.filter)
                .set(function (x) { return x.selectBase; }, action.value)
                .toObject();
            var newModalSelectBase = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.filter; }, newModalFilterSelectBase)
                .toObject();
            var newListModalSelectBase = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalSelectBase)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListModalSelectBase)
                .toObject();
        case ConstantsList.SET_SELECT_EXPENSE:
            var filterModalNewExpense = ImmutableDescriptor_1["default"](state.list.modal.filter)
                .set(function (x) { return x.selectExpense; }, action.value)
                .toObject();
            var newModalExpense = ImmutableDescriptor_1["default"](state.list.modal)
                .set(function (x) { return x.filter; }, filterModalNewExpense)
                .toObject();
            var newListExpense = ImmutableDescriptor_1["default"](state.list)
                .set(function (x) { return x.modal; }, newModalExpense)
                .toObject();
            return ImmutableDescriptor_1["default"](state)
                .set(function (x) { return x.list; }, newListExpense)
                .toObject();
        default:
            return state;
    }
};
//# sourceMappingURL=plan.js.map