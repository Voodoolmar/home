/// <reference path="../../../typings/tsd.d.ts" />
import Query from '../../framework/Query'
import {SelectList, SelectListItem} from '../../model/cache/MainCache'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class getTransactionTypeList extends Query<{}, SelectListItem[]> {
    constructor() {
        super(serviceHostGetter('Billing', 'EntityTypes'));
    }

    //TODO::Test
    get() {
        return new Promise(
            (resolve: (data: any) => void, reject: () => void) => {
                setTimeout(() => {
                     resolve([
						{ id: 'expense', name: 'Расход' },
                		{ id: 'incoming', name: 'Приход' },
                		{ id: 'incoming-without-debt', name: 'Приход без долга'}
                	]);
                },5000)                            
            }
        );
    }
}

export default new getTransactionTypeList();
