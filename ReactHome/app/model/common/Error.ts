import Message from './Message'

export default class Error {
	constructor(
		public isError: boolean = false,
		public message: Message = new Message()
	) {}
}