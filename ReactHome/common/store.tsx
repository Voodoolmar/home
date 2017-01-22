import * as React from 'react'

import { createStore, compose, applyMiddleware } from 'redux'
//import { createDevTools } from 'redux-devtools'
//import LogMonitor from 'redux-devtools-log-monitor'
//import DockMonitor from 'redux-devtools-dock-monitor'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'



import RootState from '../app/model/RootState'
import root from '../app/reducers/root'

//export const DevTools = createDevTools(
//    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//    </DockMonitor>
//)

export function configureStore(history, initialState) {
    //let devTools = []
    //if (typeof document !== 'undefined') {
    //    devTools = [DevTools.instrument()]
    //}

	const middleware = routerMiddleware(history);
	const enhancer: any = applyMiddleware(middleware, thunk);
	const store = createStore(root, initialState, enhancer);

	return store;
}