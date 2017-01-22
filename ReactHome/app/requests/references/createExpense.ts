import Query from '../../framework/Query'
import {ICreateExpense} from '../../dto/ExpenseListDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class CreateExpense extends Query<ICreateExpense, {}> {
    constructor() {
        super(serviceHostGetter('Billing', 'Expense'));
    }
}

export default new CreateExpense();