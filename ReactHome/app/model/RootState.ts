
import Config from './Config';
import Error from './Error';
import Menu from './Menu';

export default class RootState
{
	constructor(
		public config: Config = new Config(),
		public error: Error = new Error(),
		public menu: Menu = new Menu()
	) { }
}