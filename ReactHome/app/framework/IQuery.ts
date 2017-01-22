import {Promise} from 'es6-promise'


export interface IResponsePromise<TResponse>{
    then(resolve: (data: TResponse, totalCount: number) => void) : Promise<TResponse>;
}

export class GetResponse<TResponse> {
    constructor(public response: TResponse, public totalCount: number) {
    }
}

export interface IQuery<TRequest, TResponse> {
    get(request?: TRequest): Promise<GetResponse<TResponse>>;
    post(request?: TRequest): Promise<any>;
    put(request?: TRequest): Promise<any>;
    delete(request?: TRequest): Promise<any>;
}

export default IQuery