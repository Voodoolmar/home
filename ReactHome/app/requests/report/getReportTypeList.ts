import Query from '../../framework/Query'
import {SelectList, SelectListItem} from '../../model/cache/MainCache'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class GetReportTypeListQuery extends Query<{}, SelectListItem[]> {
    constructor() {
        super(serviceHostGetter('Billing', 'EntityTypes'));
    }

    //TODO::Test
    get() {
        return new Promise(
            (resolve: (data: any) => void, reject: () => void) => {
                setTimeout(() => {
                     resolve([
                    { name: 'Отчет по базе', id: 'report-base' },
                    { name: 'Общий отчет', id: 'report-common' },
                    { name: 'Главный отчет', id: 'report-main' }
                ]);
                },100)                            
            }
        );
    }
}

export default new GetReportTypeListQuery();
