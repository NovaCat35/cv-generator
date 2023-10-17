import { Input } from "./Input.tsx";
import { InputDate } from "./InputDate.tsx";
import { Education, HandleChange } from "../App.tsx";
import { useState } from "react";
import DisableDate from "./DisableDate.tsx";

interface EducationFormProps {
	onChange: (data: HandleChange) => void;
	currState: Education;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function EducationForm({ onChange, setState, currState }: EducationFormProps) {
	const [isChecked, setIsChecked] = useState(false);

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
		const value = "Present";
		const keyName = "endDate";
		onChange({ value, keyName, setState, currState });
	};

	return (
		<div className="form-container">
			<h1>Education</h1>
			<form action="">
				<Input label="School" keyName="school" placeholder="School Name" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Location" keyName="location" placeholder="School Name" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Degree | Study" keyName="study" placeholder="Degree Type" onChange={onChange} setState={setState} currState={currState} />
				<DisableDate onToggle={handleToggle} />
				<InputDate label="Start Date" keyName="startDate" onChange={onChange} setState={setState} currState={currState} />
				{isChecked ? "" : <InputDate label="End Date" keyName="endDate" onChange={onChange} setState={setState} currState={currState} />}
			</form>
		</div>
	);
}
