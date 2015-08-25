import Dispatcher from '../core/Dispatcher';
import http from '../core/http';

export default {
	loadState(cb) {
		Dispatcher.dispatch({
			eventName: 'Ligth.StateLoading'
		});
		http.get('/api/lightState/get')
			.end((err,res) => {
				Dispatcher.dispatch({
					eventName: 'Ligth.StateLoaded',
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
