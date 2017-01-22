import ICommand from './ICommand'
import * as jquery from 'jquery';

export default class Command<TRequest, TResponse> implements ICommand<TRequest, TResponse>{
    constructor(public url: string) {
    }

    post(request?: TRequest): Promise<TResponse> {
        return new Promise(
            (resolve: (data: any) => void, reject: () => void) => {
                jquery.ajax({
                    url: this.url,
                    success: (data) => {
                        resolve(data);
                    },
                    error: () => {
                        reject();
                    }
                });
            }
        );
    }
}