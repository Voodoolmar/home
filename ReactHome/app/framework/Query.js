"use strict";
var IQuery_1 = require('./IQuery');
//import * as jquery from 'jquery';
var Sorter_1 = require('../model/common/Sorter');
var fetch = require('isomorphic-fetch');
var AssistantDates_1 = require('../helpers/AssistantDates');
var CommonMethods_1 = require('../helpers/CommonMethods');
var Query = (function () {
    function Query(url) {
        this.url = url;
    }
    Query.prototype.get = function (request) {
        var _this = this;
        var totalCount = 0;
        return new Promise(function (resolve, reject) {
            fetch(createUrlWithParams(_this.url, request))
                .then(function (response) {
                if (response.ok) {
                    var valueMessageTypes = response.headers.get('message-types');
                    totalCount = valueMessageTypes ? parseInt(response.headers.get('message-types').split(':')[1]) : 0;
                    return response.json();
                }
                return;
            })
                .then(function (data) {
                resolve(data);
            });
        }).then(function (data) {
            return Promise.resolve(new IQuery_1.GetResponse(data, totalCount));
        });
    };
    Query.prototype.post = function (request) {
        request['date'] = new AssistantDates_1["default"](request['date']).dateToRequest();
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(request)
        });
    };
    Query.prototype.put = function (request) {
        request['date'] = new AssistantDates_1["default"](request['date']).dateToRequest();
        return fetch(this.url, {
            method: 'PUT',
            body: JSON.stringify(request)
        });
    };
    Query.prototype.delete = function (request) {
        return fetch(createUrlWithParams(this.url, request), { method: 'DELETE' });
    };
    return Query;
}());
exports.__esModule = true;
exports["default"] = Query;
function createUrlWithParams(url, data) {
    var formatData = createValidRequest(data);
    return CommonMethods_1.createUrl(url, formatData);
}
function createValidRequest(data) {
    var validRequest = {};
    for (var param in data) {
        if (data[param] instanceof Array) {
            if (data[param].length > 0) {
                if (data[param][0].hasOwnProperty('direction') && data[param][0].hasOwnProperty('field')) {
                    validRequest[param] = data[param].map(function (obj) {
                        if (obj.direction == Sorter_1.SortDirection.Ascending) {
                            return '+' + obj.field;
                        }
                        else {
                            return '-' + obj.field;
                        }
                    });
                }
                else {
                    validRequest[param] = data[param].join(',');
                }
            }
        }
        if (data[param] instanceof Date) {
            validRequest[param] = new AssistantDates_1["default"](data[param]).dateToRequest();
        }
        if (typeof data[param] === 'number') {
            if (!isNaN(data[param])) {
                validRequest[param] = data[param];
            }
        }
        if (typeof data[param] === 'string') {
            if (data[param] !== '') {
                validRequest[param] = encodeURI(data[param]);
            }
        }
    }
    return validRequest;
}
//# sourceMappingURL=Query.js.map