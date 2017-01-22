/// <reference path="../../../typings/tsd.d.ts" />
import {Promise} from 'es6-promise'
import Entity from '../../model/plan/Entity'
import EntityType from '../../model/plan/EntityType'
import Account from '../../model/plan/Account'
import AccountType from '../../model/plan/AccountType'
import * as fetch from 'isomorphic-fetch'
import Query from '../../framework/Query'
import {ITransactionFilterDto} from '../../dto/TransactionFilterDto'
import {IAccountFilterDto} from '../../dto/AccountFilterDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class createTransaction extends Query<ITransactionFilterDto, any> {
    constructor() {
	    super(serviceHostGetter('Billing', 'Transaction'));
    }
}

export default new createTransaction();