/// <reference path="../../typings/tsd.d.ts" />
import * as React from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../framework/BaseComponent';
import MenuState from '../model/MenuState'
import RootState from '../model/RootState';
import { bindActionCreators} from 'redux'

interface INavbarState {
	
}
interface INavbarDispatch {
}

class Navbar extends BaseComponent<{}, INavbarState, INavbarDispatch> {
    render() {
        return (
            <header class="header">
                <h1 class="header__title">Home</h1>
                <button id="butRefresh" class="headerButton" aria-label="Refresh"></button>
                <button id="butAdd" class="headerButton" aria-label="Add"></button>
            </header>
		);
	}

}

export default connect<{}, RootState, INavbarState, INavbarDispatch>(
    state => ({
	}),
    dispatch => ({
    }))(Navbar);