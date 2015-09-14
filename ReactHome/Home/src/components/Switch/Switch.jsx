import './Switch.less';
import React, { PropTypes } from 'react';

class Switch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: this.props.value};
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		let value = !this.state.value;
		this.setState({value: value});
		this.props.onChange(this.props.id, value);
	}

	render() {
		let classNames = 'btn btn-sm';
		if(this.state.value){
			classNames += ' btn-primary';
		}else{
			classNames += ' btn-default';
		}
		return (
			<a className={classNames} onClick={this.onClick}>
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
