/// <reference path="../../typings/tsd.d.ts" />
import * as React from 'react';

export default class BusyIndicator extends React.Component<{ }, { }>{
    render() {
		return (
			<div id="initializationBusyIndicator">
				<div id="followingBallsG" style={{ display: 'inline-block' }}>
					<div id="followingBallsG_1" className="followingBallsG">
					</div>
					<div id="followingBallsG_2" className="followingBallsG">
					</div>
					<div id="followingBallsG_3" className="followingBallsG">
					</div>
					<div id="followingBallsG_4" className="followingBallsG">
					</div>
				</div>
			</div>);
	}

}