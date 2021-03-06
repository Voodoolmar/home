import 'babel/polyfill';

import React from 'react/addons';
import Router from 'react-router';
import routes from './router';
import FastClick from 'fastclick';
import emptyFunction from 'react/lib/emptyFunction';
import App from './components/App';
import Dispatcher from './core/Dispatcher';
import AppActions from './actions/AppActions';
import LightActions from './actions/LightActions';
import ioClient from 'socket.io-client';

let path = decodeURI(window.location.pathname);
let setMetaTag = (name, content) => {
  // Remove and create a new <meta /> tag in order to make it work
  // with bookmarks in Safari
  let elements = document.getElementsByTagName('meta');
  [].slice.call(elements).forEach((element) => {
    if (element.getAttribute('name') === name) {
      element.parentNode.removeChild(element);
    }
  });
  let meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  document.getElementsByTagName('head')[0].appendChild(meta);
};

function run() {
  // Render the top-level React component
  let props = {
    path: path,
    setTitle: (title) => document.title = title,
    onSetMeta: setMetaTag,
    onPageNotFound: emptyFunction
  };
  var socket = ioClient('http://localhost:3005');
  socket.on('stateChanged', () => {
	  LightActions.loadState();
  });
  Router.run(routes, Router.HistoryLocation, (Root, state) => {
	props.path = state.path;
  	React.render(<Root {...props} />, document.body);
  });
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }).then(() => FastClick.attach(document.body)),
  new Promise((resolve) => AppActions.loadPage(path, resolve))
]).then(run);
