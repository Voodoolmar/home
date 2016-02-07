import './Lights.less';
import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Room from '../Room';
import LightStore from '../../stores/LightStore';
import LightActions from '../../actions/LightActions';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

class Lights extends React.Component {
	constructor(props){
		super(props);
		this.state = LightStore.getState();
		this.lightsChanged = this.lightsChanged.bind(this);
	}
	lightsChanged(){
		this.setState(LightStore.getState());
	}
	componentDidMount() { 
		LightStore.on('change', this.lightsChanged);
	}
	componentWillUnmount() {  
		LightStore.off('change', this.lightsChanged);
	}
	render() {
		return (
			<div>
				{
					this.state.rooms.map((room)=>{
						return (<Room key={room.id} room={room} />)
					})
				}
			</div>
		);
	}
}

Lights.willTransitionTo = (transition, params, query, callback) => {
	LightActions.loadState(callback);
}

export default Lights;
