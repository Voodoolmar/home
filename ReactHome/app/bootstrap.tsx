/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { useBasename, createHistory }  from 'history'
import { Router, Route, browserHistory, useRouterHistory  } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import * as jquery from 'jquery';

import routes from '../common/routes'
import {configureStore} from '../common/store'

//initialState
import RootState from './model/RootState'


function getInitialState<T>(initialState) {
	return initialState;
}

const initialState: RootState = getInitialState<RootState>(window["__INITIAL_STATE__"]);
//end initialState


let store = configureStore(browserHistory, initialState);

const basename = '';
const yy = useRouterHistory(createHistory)({
    basename
});
const history = syncHistoryWithStore(yy, store);

jquery.ajaxSetup({
	error: (jqXhr: JQueryXHR, textStatus: string) => {
		store.dispatch({ type: 'Error', value: jqXhr.responseJSON.error });
	}
});

render(
	<Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
	document.getElementById('root')
);