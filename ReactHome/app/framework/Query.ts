
import {IQuery, GetResponse, IResponsePromise } from './IQuery'
//import * as jquery from 'jquery';
import {SortDirection} from '../model/common/Sorter'
import * as fetch from 'isomorphic-fetch'
import AssistantDates from '../helpers/AssistantDates'
import {createUrl} from '../helpers/CommonMethods'

export default class Query<TRequest, TResponse> implements IQuery<TRequest, TResponse>{
    constructor(public url: string) {
    }

    get(request?: TRequest):Promise<GetResponse<TResponse>> {
        var totalCount = 0;

        return new Promise(
            (resolve: (data: TResponse) => void, reject: () => void) => {
                fetch(createUrlWithParams(this.url, request))
                    .then(response => {
                        if (response.ok) {
                            var valueMessageTypes = response.headers.get('message-types');
                            totalCount = valueMessageTypes ? parseInt(response.headers.get('message-types').split(':')[1]) : 0;
                            return response.json();
                        }
                        return;
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch((e) => {
                        var kk = e;
                    })
            }
        ).then((data: TResponse) => {
            return Promise.resolve(new GetResponse(data, totalCount));
        });
    }

    post(request?: TRequest): Promise<any> {
        request['date'] = new AssistantDates(request['date']).dateToRequest();
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(request)
        });
    }

    put(request?: TRequest): Promise<any> {
        request['date'] = new AssistantDates(request['date']).dateToRequest();
        return fetch(this.url, {
            method: 'PUT',
            body: JSON.stringify(request)
        });
    }

    delete(request?: TRequest): Promise<any> {
       return fetch(createUrlWithParams(this.url,request),{method: 'DELETE'});
    }
}

function createUrlWithParams(url: string, data: any): string {
    var formatData = createValidRequest(data);
    return createUrl(url,formatData);
}

function createValidRequest(data: any) {
    var validRequest = {};
    for (var param in data) {
        if (data[param] instanceof Array) {
            if (data[param].length > 0) {
                if (data[param][0].hasOwnProperty('direction') && data[param][0].hasOwnProperty('field')) {
                    validRequest[param] = data[param].map(obj => {
                        if (obj.direction == SortDirection.Ascending) {
                            return '+' + obj.field
                        }
                        else {
                            return '-' + obj.field
                        }
                    })
                }
                else {
                    validRequest[param] = data[param].join(',');
                }
            }
        }
        if (data[param] instanceof Date) {
            validRequest[param] = new AssistantDates(data[param]).dateToRequest();
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

