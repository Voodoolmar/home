import Query from '../../framework/Query'
import {IReportItemDto} from '../../dto/ReportItemDto'
import {IReportItemFilterDto} from '../../dto/ReportItemFilterDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class GetReportItemListQuery extends Query<IReportItemFilterDto, IReportItemDto[]> {
    constructor() {
		super(serviceHostGetter('Billing', 'ReportItem'));
    }
}

export default new GetReportItemListQuery();