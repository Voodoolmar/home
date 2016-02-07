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
import http from 'superagent';

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
			lights:[{id: 10, name: 'Люстра', state: false}],
			ledLines: [{id:101, name: 'Правый', state: 0},{id:102, name: 'Левый', state: 0}]
		},
		{
			id: 2,
			name: 'Кухня',
			lights:[{id: 13, name: 'Люстра', state: false},{id: 14, name: 'Потолок', state: false}],
			ledLines:[]
		},
		{
			id: 3,
			name: 'Спальня',
			lights:[{id: 11, name: 'Люстра', state: false},{id: 12, name: 'Гардероб', state: false}],
			ledLines: [{id:103, name: 'Правый', state: 0},{id:104, name: 'Левый', state: 0}]
		},
		{
			id: 4,
			name: 'Туалет',
			lights:[{id: 4, name: 'Люстра', state: false},{id: 16, name: 'Гардероб', state: false}],
			ledLines: []
		},
		{
			id: 5,
			name: 'Коридор',
			lights:[{id: 15, name: 'Потолок', state: false}],
			ledLines:[]
		}

	]
};

process.server.get('/api/lightState/get', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(lightState));
});

process.server.get('/api/lightState/set', function (req, res) {
	const roomId = +req.query.roomId;
	const lightId = +req.query.lightId;
	const sliderId = +req.query.sliderId;
	const state = +req.query.state || req.query.state === 'true';
	for (let i = 0; i < lightState.rooms.length; i++) {
		const room = lightState.rooms[i];
		if (room.id !== roomId) continue;
		if (lightId) {
			for (let j = 0; j < room.lights.length; j++) {
				const light = room.lights[j];
				if(light.id !== lightId) continue;
				light.state = state;
				http
					.get(`http://192.168.1.200/${lightId}/${+state}`)
					.accept('application/json')
					.end((err,data)=>updateServerState(err,data, res));
				break;
			}
		}
		if (sliderId) {
			for (let j = 0; j < room.ledLines.length; j++) {
				const ledLine = room.ledLines[j];
				if(ledLine.id !== sliderId) continue;
				ledLine.state = +state;
				http
					.get(`http://192.168.1.200/${sliderId}/${255-state}`)
					.accept('application/json')
					.end((err,data)=>updateServerState(err,data, res));
				break;
			}
		}
	}
});

function updateServerState(err,data, res) {
	const arduinoState = JSON.parse(data.text);
	for (let i = 0; i < lightState.rooms.length; i++) {
		const room = lightState.rooms[i];
		for (let j = 0; j < room.lights.length; j++) {
			const light = room.lights[j];
			light.state = arduinoState[`s${light.id}`];
		}
		for (let j = 0; j < room.ledLines.length; j++) {
			const ledLine = room.ledLines[j];
			ledLine.state = arduinoState[`a${ledLine.id}`];
		}
	}
	io.emit('stateChanged');
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(lightState));
}
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
