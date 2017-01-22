
interface ISwitchProps {
	id: number;
    value: boolean;
    onChange?: (id: number, value: boolean) => any;
}

export default ISwitchProps