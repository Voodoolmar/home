/// <reference path="../../../typings/tsd.d.ts" />
import Query from '../../framework/Query'
import {SelectList, SelectListItem} from '../../model/cache/MainCache'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class getBaseList extends Query<{}, SelectListItem[]> {
    constructor() {
        super(serviceHostGetter('Billing', 'EntityTypes'));
    }

    //TODO::Test
    get() {
        return new Promise(
            (resolve: (data: any) => void, reject: () => void) => {
                setTimeout(() => {
                     resolve([
						{ name: 'Обогатительная', id: 'obogatitelnya' },
						{ name: 'Богдана-Хмельницкого', id: 'bogdana-khmelnitsky' },
						{ name: 'Гоголя', id: 'gogolya' }
                	]);
                },100)                            
            }
        );
    }
}

export default new getBaseList();
