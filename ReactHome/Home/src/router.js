import React from 'react';
import { Route } from 'react-router';
import App from './components/App';
import ContentPage from './components/ContentPage';

var routes = (
	  <Route path="/" handler={App}>
		  <Route path="privacy" handler={ContentPage}/>
	  </Route>
	);
export default routes;