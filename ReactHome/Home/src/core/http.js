import request from 'superagent';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

const getUrl = path => {
	return path.indexOf('http') === 0
		? path 
		: ExecutionEnvironment.canUseDOM 
			? path 
			: process.env.WEBSITE_HOSTNAME 
				? `http://${process.env.WEBSITE_HOSTNAME}${path}` 
				: `http://127.0.0.1:${process.server.get('port')}${path}`;
}

const http = {

	//get: path => new Promise((resolve, reject) => {
	//	request
	//	  .get(getUrl(path))
	//	  .accept('application/json')
	//	  .end((err, res) => {
	//	  	if (err) {
	//	  		if (err.status === 404) {
	//	  			resolve(null);
	//	  		} else {
	//	  			reject(err);
	//	  		}
	//	  	} else {
	//	  		resolve(res.body);
	//	  	}
	//	  });
	//})
	get: path => {
		return request
			.get(getUrl(path))
			.accept('application/json');
	}

};

export default http;