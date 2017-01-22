import {Promise} from 'es6-promise'

interface ICommand<TRequest, TResponse> {
    post(request?: TRequest): Promise<TResponse>;
}

export default ICommand