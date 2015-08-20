/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
import http from 'superagent';

export default {
  loadPage(path, cb) {
    //Dispatcher.handleViewAction({
    //  actionType: ActionTypes.LOAD_PAGE,
    //  path
    //});

    //http.get('/api/page' + path)
    //  .accept('application/json')
    //  .end((err, res) => {
    //    if (cb) {
    //      cb();
    //    }
  	//  });
	  cb();
  }

};
