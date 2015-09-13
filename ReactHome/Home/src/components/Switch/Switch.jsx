import './Switch.less';
import React, { PropTypes } from 'react';

class Switch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: this.props.value};
		this.onClick = this.onClick.bind(this);
	}

	onClick(){
		this.setState({value: !this.state.value});
		this.props.onChange(this.props.key, this.state.value);
	}

	render() {
		let classNames = 'btn btn-sm';
		if(this.state.value){
			classNames += ' btn-default';
		}else{
			classNames += ' btn-primary';
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
