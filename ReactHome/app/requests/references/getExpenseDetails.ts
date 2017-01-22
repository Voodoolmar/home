import Query from '../../framework/Query'
import {IExpenseDetailsFilter,IExpenseDetails} from '../../dto/ExpenseListDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class GetExpenseDetails extends Query<IExpenseDetailsFilter, IExpenseDetails> {
    constructor() {
        super(serviceHostGetter('Billing', 'Expense'));
    }
}

export default new GetExpenseDetails();