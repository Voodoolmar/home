import './Room.less';
import React, { PropTypes } from 'react'; // eslint-disable-line no-unused-vars
import Slider from '../Slider';
import Switch from '../Switch';
import LightActions from '../../actions/LightActions';

class Room extends React.Component {
	constructor(props){
		super(props);
		this.state = this.props.room;
		this.onSwitchClick = this.onSwitchClick.bind(this);
		this.onSliderChange = this.onSliderChange.bind(this);
	}
		
	onSliderChange(sliderId, value){
		LightActions.updateSliderState(this.props.room.id, sliderId, value)
	}

	onSwitchClick(lightId, value){
		LightActions.updateSwitchState(this.props.room.id, lightId, value)
	}

	render() {		
  		return (
			<div className="panel panel-default Room">
				<div className="panel-heading clearfix">
					<h4 className="panel-title pull-left">{this.props.room.name}</h4>
					<div className="btn-group pull-right">
						{
							this.state.lights.map((light)=>{
								return (<Switch key={light.id} id={light.id} title={light.name} onChange={this.onSwitchClick} value={light.state} />)
							})
						}
					</div>
				</div>
				<div className="panel-body">
					{
						this.state.ledLines.map((ledLine)=>{
							return (<Slider key={ledLine.id} id={ledLine.id} max={255} onChange={this.onSliderChange} value={ledLine.state} />)
						})
					}
				</div>
			</div>
		);
	}
}


Room.propTypes = {
	room: PropTypes.object.isRequired
};

export default Room;
