import * as moment from 'moment'

export default class Period {
    constructor(
       public from: Date = moment(new Date()).date(1).seconds(0).milliseconds(0).toDate(),
       public to: Date = moment(new Date()).seconds(0).milliseconds(0).toDate(),
       public selectDay: SelectDay = new SelectDay()
    ) {        
    }
}

export class SelectDay {
    constructor(
        public name: string = 'Период',
        public id: number = TimeLocation.Custom
    ){}
}

export enum TimeLocation {
	Today,
	Tommorow,
    CurrentWeek,
    PrevWeek,
    CurrentMonth,
    PrevMonth,
    Custom
}