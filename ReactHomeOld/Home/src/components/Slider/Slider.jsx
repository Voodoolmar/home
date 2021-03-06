import './Slider.less';
import React, { PropTypes } from 'react';

class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: this.props.value};
		this._onChange = this._onChange.bind(this);
	}

	_onChange(e){
		if(e){
			var value = +e.target.value;
			if(value !== this.state.value){
				this.setState({value: value});
				this.props.onChange(this.props.id, value);
			}
		}
	}
	//componentWillReceiveProps(nextProps) {
	//	this.setState({
	//		value: nextProps.value
	//	});
	//}
	render() {
		return (
			<input type="range"
				min={this.props.min}
				max={this.props.max}
				onChange={this._onChange}
				step={1}
				value={this.state.value} />
		);
	}

}

Slider.propTypes = {
	min: PropTypes.number,
	max: PropTypes.number,
	onChange: PropTypes.func,
	value: PropTypes.number
};
Slider.defaultProps = {
	min: 0,
	max: 100,
	value: 0
};

export default Slider;
