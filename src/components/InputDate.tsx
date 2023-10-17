import { HandleChange } from "../App.tsx";
import formatDate from './DateFormatter.tsx'

interface InputDateProps {
	keyName: string;
	label: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
	onChange: (data: HandleChange) => void;
}

export function InputDate({ keyName, label, onChange, setState, currState }: InputDateProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = formatDate(e.target.value);
      console.log(value)
		onChange({ value, keyName, setState, currState });
	};

	return (
		<div>
			<label htmlFor={keyName}>{label}</label>
			<input type="month" id={keyName} placeholder="hi" onChange={handleChange} required/>
		</div>
	);
}
