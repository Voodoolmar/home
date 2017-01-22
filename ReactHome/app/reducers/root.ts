import {combineReducers} from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import config from './config'
import error from './error'
import RootState from '../model/RootState'

export default combineReducers<RootState>({
	config: config,
	routing: routerReducer,
	error: error,
})