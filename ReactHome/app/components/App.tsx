import * as React from 'react';
import { connect } from 'react-redux';
import { Router, Route, browserHistory, useRouterHistory  } from 'react-router'
import BaseComponent from '../framework/BaseComponent';
import RootState from '../model/RootState';
import {MenuState} from '../model/Menu';
import Error from '../model/Error';
import Navbar from './Navbar';
import {canUseDom} from '../framework/ExecutionEnvironment';
import * as classnames from 'classnames'
import { bindActionCreators} from 'redux'

export interface IAppProps {
	location: HistoryModule.Location;
	menuState: MenuState;
}
export interface IAppState {
	error: Error;
}

export interface IAppDispatch {
	closeError: () => void;
}

class App extends BaseComponent<IAppProps, IAppState, IAppDispatch> {
    componentWillMount() {
    }
    componentDidMount() {
        
    }

    render() {
        var tt = this.props.location.basename;
		const appClasses = classnames('fixed-header', { hiddenMenu: this.props.menuState === MenuState.Hidden, minified: this.props.menuState === MenuState.Minified });
        return (
            <div className={appClasses}>
                <Navbar />
                <div id="main" role="main">
                    

                    <div id="content">
                        {this.props.children}
                    </div>

                </div>
            </div>
        );
    }
}
export default connect<IAppProps, RootState, IAppState, {}>(
    (state, ownProps) => ({
		error: state.error,
		menuState: state.menu.state
    }),
	(dispatch) => ({
		closeError: () => {
			dispatch({ type: 'Error', value: '' });
		}
	})
)(App);

// <span className="ribbon-button-alignment">
//                             <span id="refresh" className="btn btn-ribbon" data-action="resetWidgets" data-title="refresh" rel="tooltip" data-placement="bottom" data-original-title="<i class='text-warning fa fa-warning'></i> Warning! This will reset all your widget settings." data-html="true">
//                                 <i className="fa fa-refresh"></i>
//                             </span>
//                         </span>

//                         <ol className="breadcrumb">
//                             <li>Home</li>
//                             <li>App Views</li>
//                             <li>Profile</li>
//                         </ol>

// <div id="ribbon">
                  
//                     </div>