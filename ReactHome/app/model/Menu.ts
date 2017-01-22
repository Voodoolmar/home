export enum MenuState { Full, Minified, Hidden }

export default class Menu {
	constructor(
		public state: MenuState = MenuState.Full
	) { }
}