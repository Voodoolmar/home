import Query from '../../framework/Query'
import {IDeleteExpense} from '../../dto/ExpenseListDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class DeleteExpense extends Query<IDeleteExpense, {}> {
    constructor() {
        super(serviceHostGetter('Billing', 'Expense'));
    }
}

export default new DeleteExpense();