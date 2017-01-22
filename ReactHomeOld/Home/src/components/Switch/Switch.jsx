import React, { PropTypes } from 'react';

class Switch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: this.props.value};
		this._onClick = this._onClick.bind(this);
	}

	_onClick(){
		let value = !this.state.value;
		this.props.onChange(this.props.id, value);
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.value != this.state.value){
			this.setState({
				value: nextProps.value
			});
		}
	}
	render() {
		let classNames = 'btn btn-sm';
		if(this.state.value){
			classNames += ' btn-primary';
		}else{
			classNames += ' btn-default';
		}
		return (
			<a className={classNames} onClick={this._onClick}>
				<i className="glyphicon glyphicon-off"></i>
			</a>
		);
	}

}

Switch.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.bool
};
Switch.defaultProps = {
	value: false
};

export default Switch;
