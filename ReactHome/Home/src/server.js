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

var server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname)));

//
// Page API
// -----------------------------------------------------------------------------
server.get('/api/page/*', function(req, res) {
  var urlPath = req.path.substr(9);
  var page = AppStore.getPage(urlPath);
  res.send(page);
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
	Router.run(routes, req.path, (Root) => {
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
