import * as React from 'react'
import {renderToString} from 'react-dom/server'
import * as express from 'express'
import { match, RouterContext, createMemoryHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

import routes from '../common/routes'
import {configureStore} from '../common/store'

const basename = `/${process.env.VIRTUAL_APP}`;

var app = express();
app.use(basename,express.static(__dirname + '/../public'));

function renderFullPage(html, initialState) {
    var configuration = process.env.CONFIGURATION ? `'${process.env.CONFIGURATION}'` : null;
    return "<!doctype html>" +
        "<html>" +
        "<head>" +
        "<title>Home</title>" +
        `<link rel='stylesheet' href='${basename}/styles/inline.css'>` +        
        `<link rel='apple-touch-icon' href='${basename}/images/icons/icon-152x152.png'>`+
        `<link rel='manifest' href='${basename}/manifest.json'>`+
        "</head>" +
        "<body>" +
        "<div id='root'>" + html + "</div>" +
        "<script>" +
        "window.__INITIAL_STATE__=" + JSON.stringify(initialState) + ";" +
        "window.__VIRTUAL_HOST__='" + process.env.VIRTUAL_HOST + "';" + 
        "window.__CONFIGURATION__=" + configuration + ";" + 
        "</script>" +
        `<script src='${basename}/scripts/app.js' async></script>` +
        "</body>" +
        "</html>";
}

// This is fired every time the server side receives a request
app.use((req, res) => {
    let initialState = {
	    
    };
    const memoryHistory = createMemoryHistory({basename: basename,entries: [req.url]});
	const store = configureStore(memoryHistory, initialState);
	const history: any = syncHistoryWithStore(memoryHistory, store);
	// Note that req.url here should be the full URL path from
	// the original request, including the query string.
	match({ history, routes}, (error, redirectLocation, renderProps:any) => {
		if (error) {
			res.status(500).send(error.message);
        } else if (redirectLocation) {
            
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			// You can also check renderProps.components or renderProps.routes for
			// your "not found" component or route respectively, and send a 404 as
			// below, if you're using a catch-all route.
            
			fetchComponentData(store.dispatch, renderProps.components, renderProps.location.query)
				.then(() => {
					res.status(200).send(renderFullPage(renderToString(
						<Provider store={store}>
							<RouterContext {...renderProps}/>
						</Provider>), store.getState()));
				})
			
		} else {
			res.status(404).send('Not found');
		}
	});
});

export default app;

function fetchComponentData(dispatch, components, params) {	
	const needs = components.reduce((prev, current) => {
		return ((current.WrappedComponent  ? current.WrappedComponent.needs : []) || [])
			.concat(prev);
    }, []);	    
    const promises = needs.map(need => dispatch(need(params)));	
    return Promise.all(promises);
}