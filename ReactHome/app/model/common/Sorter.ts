export default class Sorter {
    constructor(
        public direction: SortDirection = null,
        public field: string = ''
    ) { }
}

export enum SortDirection {
	Ascending,
	Descending
}
