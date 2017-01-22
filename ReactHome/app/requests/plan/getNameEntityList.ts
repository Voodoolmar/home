/// <reference path="../../../typings/tsd.d.ts" />
import {Promise} from 'es6-promise'
import Entity from '../../model/plan/Entity'
import EntityType from '../../model/plan/EntityType'
import Account from '../../model/plan/Account'
import AccountType from '../../model/plan/AccountType'
import * as fetch from 'isomorphic-fetch'
import Query from '../../framework/Query'
import {IEntityDto} from '../../dto/EntityDto'
import {IEntityFilterDto} from '../../dto/EntityFilterDto'
import serviceHostGetter from '../../framework/serviceHostGetter'

export class getNameEntityList extends Query<IEntityFilterDto, IEntityDto[]> {
    constructor() {
		// super(serviceHostGetter('TaxiPro', 'Users', configuration => {
    //   var conf = !configuration ? "staging." : configuration == "production" ? "" : (configuration + ".");
    //   return conf + "globaxi.ru";
    // }));
      super(serviceHostGetter('Billing', 'Entity'));
    }
}

export default new getNameEntityList();