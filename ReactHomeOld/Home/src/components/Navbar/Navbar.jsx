/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'; // eslint-disable-line no-unused-vars
import {Link} from 'react-router';
import $ from 'jquery';

class Navbar {

	collapseMenu(e){
		$(e.target).parents(".navbar").find(".collapse").toggle('slide');
	}
	render() {
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" onClick={this.collapseMenu}>
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/">
							<img src={require('./logo-small.png')} width="38" height="38" alt="React" />
							<span>MyHome</span>
						</Link>
						<button type="button" className="btn btn-default navbar-btn navbar-left"><i className="glyphicon glyphicon-bell"></i></button>
						<button type="button" className="btn btn-default navbar-btn navbar-left"><i className="glyphicon glyphicon-off"></i></button>
					</div>
  					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<ul className="nav navbar-nav">
							<li><Link to="/Lights">Свет</Link></li>
							<li><Link to="/Alarm">Будильник</Link></li>
							<li><Link to="/Settings">Настройки</Link></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}

}

export default Navbar;
