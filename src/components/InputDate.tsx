import { HandleChange } from "../App.tsx";
import {formatDate, revertFormatDate} from './DateFormatter.tsx'
import { useState } from 'react';

interface InputDateProps {
	keyName: string;
	label: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
	onChange: (data: HandleChange) => void;
	dateValue?: string;
}

export function InputDate({ keyName, label, onChange, setState, currState, dateValue='' }: InputDateProps) {
	let reformattedDate = revertFormatDate(dateValue)
	console.log(reformattedDate)
	const [inputValue, setInputValue] = useState(reformattedDate);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDateValue = formatDate(e.target.value);
		setInputValue(newDateValue);
		console.log(inputValue)
		onChange({ value:inputValue, keyName, setState, currState });
	};

	return (
		<div>
			<label htmlFor={keyName}>{label}</label>
			<input type="month" id={keyName} value={inputValue} onChange={handleChange} required/>
		</div>
	);
}
