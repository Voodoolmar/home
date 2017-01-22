/// <reference path="../../../typings/tsd.d.ts" />
import Query from '../../framework/Query'
import {SelectList, SelectListItem} from '../../model/cache/MainCache'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class getAccountTypeList extends Query<{}, SelectListItem[]> {
    constructor() {
        super(serviceHostGetter('Billing', 'EntityTypes'));
    }

    //TODO::Test
    get() {
        return new Promise(
            (resolve: (data: any) => void, reject: () => void) => {
                setTimeout(() => {
                     resolve([
						{ name: 'ТО', id: 'maintenance' },
						{ name: 'Выкуп', id: 'foreclosure' },
						{ name: 'План', id: 'plan' },
						{ name: 'Другое', id: 'other' },                       
						{ name: 'Общий', id: 'common' },
						{ name: 'Полное ТО', id: 'total-maintenance' },
						{ name: 'Расход',id: 'expense' }
                	]);
                },100)                            
            }
        );
    }
}

export default new getAccountTypeList();
