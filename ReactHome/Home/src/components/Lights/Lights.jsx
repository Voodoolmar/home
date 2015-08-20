/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import './Lights.less';
import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars

class Lights {
  render() {
  	return (
		<div className="panel panel-default Lights">
			<div className="panel-heading clearfix">
				<h4 className="panel-title pull-left">Зал</h4>
				<div className="btn-group pull-right">
					<a className="btn btn-default btn-sm"><i className="glyphicon glyphicon-off"></i></a>
				</div>
			</div>
			<div className="panel-body">
				слайдеры диодов
			</div>
		</div>
    );
  }

}

export default Lights;
