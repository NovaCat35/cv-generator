import { HandleChange } from "../App.tsx";
import { useState } from "react";

interface InputProps {
	keyName: string;
	label: string;
	placeholder: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
	onChange: (data: HandleChange) => void;
	propValue?: string;
	required?: boolean;
}

export function Input({ keyName, label, placeholder, onChange, setState, currState, propValue = "", required = false }: InputProps) {
	const [inputValue, setInputValue] = useState(propValue);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setInputValue(newValue); // Update the local state with the new input[type="text"]'s value
		onChange({ value: newValue, keyName, setState, currState });
	};

	return (
		<div>
			<label htmlFor={keyName}>{label} {required && <span>*</span>}</label>
			{required ? <input type="text" id={keyName} placeholder={placeholder} onChange={handleChange} value={inputValue} required /> : <input type="text" id={keyName} placeholder={placeholder} onChange={handleChange} value={inputValue} />}
		</div>
	);
}
