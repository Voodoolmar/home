/// <reference path="../../../typings/tsd.d.ts" />
import {Promise} from 'es6-promise'
import Entity from '../../model/plan/Entity'
import EntityType from '../../model/plan/EntityType'
import Account from '../../model/plan/Account'
import AccountType from '../../model/plan/AccountType'
import Entry from '../../model/plan/Entry'
import * as fetch from 'isomorphic-fetch'
import * as moment from 'moment'
import * as jquery from 'jquery'
import Query from '../../framework/Query'
import EntryDto from '../../dto/EntryDto'
import {IEntryFilterDto}  from '../../dto/EntryFilterDto'
import serviceHostGetter from '../../framework/serviceHostGetter'


export class GetEntryListQuery extends Query<IEntryFilterDto, EntryDto[]> {
    constructor() {
		  super(serviceHostGetter('Billing', 'Entry'));
    }
}

export default new GetEntryListQuery();