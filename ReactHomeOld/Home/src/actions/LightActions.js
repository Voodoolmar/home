import Dispatcher from '../core/Dispatcher';
import http from '../core/http';

export default {
	updateSwitchState(roomId, lightId, state) {
		Dispatcher.dispatch({
			actionType: "Ligth.UpdateSwitchState",
			roomId: roomId,
			lightId: lightId,
			state:state
		});
		http.get('/api/lightState/set')
			.query({ roomId: roomId, lightId: lightId, state: state })
			.end((err,res) => {
				Dispatcher.dispatch({
					actionType: 'Ligth.StateLoaded',
					data: res.body
				});
			});
	},
	updateSliderState(roomId, sliderId, state) {
		Dispatcher.dispatch({
			actionType: "Ligth.UpdateSliderState",
			roomId: roomId,
			sliderId: sliderId,
			state:state
		});
		http.get('/api/lightState/set')
			.query({ roomId: roomId, sliderId: sliderId, state: state })
			.end((err,res) => {
				Dispatcher.dispatch({
					actionType: 'Ligth.StateLoaded',
					data: res.body
				});
			});
	},

	loadState(cb) {
		Dispatcher.dispatch({
			actionType: 'Ligth.StateLoading'
		});
		http.get('/api/lightState/get')
			.end((err,res) => {
				Dispatcher.dispatch({
					actionType: 'Ligth.StateLoaded',
					data: res.body
				});
				if (cb) {
					cb();
				}
			});
			//.then(data => {
			//	Dispatcher.dispatch({
			//		eventName: 'Ligth.StateLoaded',
			//		data: data
			//	});
			//	if (cb) {
			//		cb();
			//	}
			//});
	}
};
