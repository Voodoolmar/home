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

LightStore.dispatcherToken = Dispatcher.register((data) => {
	var action = data.eventName;
	if (action === 'Ligth.StateLoading') {
		loading = true;
	}
	
	if (action === 'Ligth.StateLoaded') {
		loading = false;
		LightStore._state = data.data;
		LightStore.emit('change');
	}
	
	if (action === 'Ligth.UpdateSwitchState') {
		for (let i = 0; i < LightStore._state.rooms.length; i++) {
			let room = LightStore._state.rooms[i];
			if(room.id !== data.roomId) continue;
			for (let j = 0; j < room.lights.length; j++) {
				let light = room.lights[j];
				if(light.id !== data.lightId) continue;
				light.state = state;
			}
		}
		LightStore.emit('change');
	}
});

export default LightStore;
