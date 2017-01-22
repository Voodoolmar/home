import React from 'react';
import { Route, DefaultRoute, NotFoundRoute } from 'react-router';
import App from './components/App';
import Lights from './components/Lights';
import Alarm from './components/Alarm';
import Settings from './components/Settings';
import NotFoundPage from './components/NotFoundPage';

var routes = (
	<Route path="/" handler={App}>
		<DefaultRoute handler={Lights}/>
		<Route path="/Lights" handler={Lights}/>
		<Route path="/Alarm" handler={Alarm}/>
		<Route path="/Settings" handler={Settings}/>
		<NotFoundRoute handler={NotFoundPage} />
	</Route>
);
export default routes;