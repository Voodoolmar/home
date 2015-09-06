/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import express from 'express';
import React from 'react';
import Router from 'react-router';
import routes from './router';
import Dispatcher from './core/Dispatcher';
import AppStore from './stores/AppStore';
import io from './core/io';

var server = process.server = express();


server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname)));
//
// Page API
// -----------------------------------------------------------------------------
let lightState = {
	rooms:[
		{
			id: 1,
			name: 'Зал',
			main: false,
			right: 0,
			left: 0
		},
		{
			id: 2,
			name: 'Кухня',
			main: false,
			additional: false
		}
	]
};

process.server.get('/api/lightState/get', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(lightState));
});
//
// Server-side rendering
// -----------------------------------------------------------------------------

// The top-level React component + HTML template for it
var templateFile = path.join(__dirname, 'templates/index.html');
var template = _.template(fs.readFileSync(templateFile, 'utf8'));

server.get('*', function(req, res) {
	var data = {description: ''};
	var params = {
		path: req.path,
		setTitle: function(title) { data.title = title; },
		onSetMeta: function(name, content) { data[name] = content; },
		onPageNotFound: function() { res.status(404); }
	};
	Router.run(routes, req.path, (Root,state) => {
  		data.body = React.renderToString(<Root {...params}/>);
  		var html = template(data);
  		res.send(html);
	});
});

server.listen(server.get('port'), function() {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
