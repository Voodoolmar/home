import Query from '../../framework/Query'
import {IExpenseDetails} from '../../dto/ExpenseListDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class UpdateExpense extends Query<IExpenseDetails, {}> {
    constructor() {
        super(serviceHostGetter('Billing', 'Expense'));
    }
}

export default new UpdateExpense();