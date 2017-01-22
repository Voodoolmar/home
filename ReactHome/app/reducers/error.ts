import Error from '../model/Error'
import Mutate from '../framework/ImmutableDescriptor'

export default (state = new Error(), action = null) => {
    switch (action.type) {
		case 'Error':
			return Mutate(state).set(x => x.message, action.value).toObject();
        default:
            return state;
    }
}