import {canUseDom} from './ExecutionEnvironment';

var serviceHostGetter = (service: string, method: string, hostGetter: (configuration)=>string = null): string => {
	var protocol = 'http';

	var host = '';
	if(!hostGetter){
		host = canUseDom ? window['__VIRTUAL_HOST__'] : process.env.VIRTUAL_HOST;
	}else{
		host = hostGetter((canUseDom ? window['__CONFIGURATION__'] : process.env.CONFIGURATION) || null);
	}
	return `${protocol}://${host}/${service}/${method}`;
}

export default serviceHostGetter