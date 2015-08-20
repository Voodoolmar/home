/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import './Alarm.less';
import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars

class Alarm {
  render() {
    return (
		<div className="panel panel-default">
			<div className="panel-heading clearfix">
				<h4 className="panel-title pull-left">Зал</h4>
				<div className="btn-group pull-right">
					<a href="#" className="btn btn-default"><i classNameName="glyphicon glyphicon-off"></i></a>
				</div>
			</div>
			<div className="panel-body">
				слайдеры диодов
			</div>
		</div>
    );
  }

}

export default Alarm;
