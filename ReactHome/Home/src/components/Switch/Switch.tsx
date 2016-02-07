import * as React from 'react';
import ISwitchProps from './ISwitchProps';
import ISwitchState from './ISwitchState';

class Switch extends React.Component<ISwitchProps, ISwitchState> {
	constructor(props) {
		super(props);
		this.state = {value: this.props.value};
		this.onClick = this.onClick.bind(this);
	}

	private onClick(){
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
		let classNames = 'btn btn-sm Switch';
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
export default Switch