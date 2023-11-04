import { HandleChange } from "../App.tsx";
import {formatDate, revertFormatDate} from '../scripts/DateFormatter.tsx'
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
	const [inputValue, setInputValue] = useState(revertFormatDate(dateValue));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDateValue = e.target.value;
		setInputValue(newDateValue);
		const formatNewDateValue = formatDate(newDateValue)
		onChange({ value:formatNewDateValue, keyName, setState, currState });
	};

	return (
		<div>
			<label htmlFor={keyName}>{label}</label>
			<input type="month" id={keyName} value={inputValue} onChange={handleChange} required/>
		</div>
	);
}
