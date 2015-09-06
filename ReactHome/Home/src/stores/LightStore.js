import Dispatcher from '../core/Dispatcher';
import EventEmitter from 'eventemitter3';
import assign from 'react/lib/Object.assign';
import LightActions from '../actions/LightActions';

var loading = false;

var LightStore = assign({}, EventEmitter.prototype, {
	_state: {},
	isLoading() {
		return loading;
	},
	getState() {
		return this._state;
	}

});

LightStore.dispatcherToken = Dispatcher.register((payload) => {
	var action = payload.eventName;
	if (action === 'Ligth.StateLoading') {
		loading = true;
	}
	
	if (action === 'Ligth.StateLoaded') {
		loading = false;
		LightStore._state = payload.data;
		LightStore.emit('change');
	}
});

export default LightStore;
