import Query from '../../framework/Query'
import {IExpenseListItem,IExpenseListFilter} from '../../dto/ExpenseListDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class GetExpenseList extends Query<IExpenseListFilter, IExpenseListItem[]> {
    constructor() {
        super(serviceHostGetter('Billing', 'Expense'));
    }
}

export default new GetExpenseList();