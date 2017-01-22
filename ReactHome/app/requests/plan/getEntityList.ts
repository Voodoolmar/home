/// <reference path="../../../typings/tsd.d.ts" />
import Query from '../../framework/Query'
import {SelectList, SelectListItem} from '../../model/cache/MainCache'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class GetEntityListQuery extends Query<{}, SelectListItem[]> {
    constructor() {
        super(serviceHostGetter('Billing', 'EntityTypes'));
    }

    //TODO::Test
    get() {
        return new Promise(
            (resolve: (data: any) => void, reject: () => void) => {
                setTimeout(() => {
                     resolve([
                    { name: 'Водитель', id: 'driver' },
                    { name: 'Авто', id: 'auto' },
                    { name: 'Водитель-авто', id: 'driver-auto' },
                	{ name: 'База', id: 'plan-base' }
                ]);
                },100)                            
            }
        );
    }
}

export default new GetEntityListQuery();
