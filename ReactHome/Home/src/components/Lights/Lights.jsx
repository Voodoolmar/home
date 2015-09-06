import './Lights.less';
import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Slider from '../Slider';
import LightStore from '../../stores/LightStore';
import LightActions from '../../actions/LightActions';
import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';

class Lights extends React.Component {
	constructor(props){
		super(props);
		this.state = LightStore.getState()
		this.onSliderChange = this.onSliderChange.bind(this);
		this.lightsChanged = this.lightsChanged.bind(this);
	}
	lightsChanged(){
		this.state = LightStore.getState();
	}
	componentDidMount() { 
		LightStore.on('change', this.lightsChanged);
	}
	componentWillUnmount() {  
		LightStore.off('change', this.lightsChanged);
	}
	onSliderChange(ev){
		/*this.setState({value: +ev.currentTarget.value});*/
	}
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
				<Slider max={255} onSliderChange={this.onSliderChange} value={this.state.test} />
			</div>
		</div>
    );
  }
}

Lights.willTransitionTo = (transition, params, query, callback) => {
	if(!ExecutionEnvironment.canUseDOM)
	{
		LightActions.loadState(callback);
	}else{
		callback()
	}
}

export default Lights;
