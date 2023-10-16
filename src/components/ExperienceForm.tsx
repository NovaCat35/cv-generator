import {Input} from "./Input.tsx";
import { HandleListChange, Experience, HandleChange } from "../App.tsx";
import { useState } from "react";

interface ExperienceFormProps {
	handleSubmitChange: (data: HandleListChange) => void;
	currState: Experience;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function ExperienceForm({ handleSubmitChange, setState, currState }: ExperienceFormProps) {
	const [currExp, setCurrExp] = useState({
		company: '',
		position: '',
		location: '',
		description: '',
		startDate: '',
		endDate: '',
	});

	const onChange = ({e, keyName} : HandleChange) => {
		setCurrExp({...currExp, [keyName] : e.target.value})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newElement = {...currExp}
		handleSubmitChange({setState, currState, newElement});
	}

	return (
		<div className="form-container">
			<h1>Experience</h1>
			<form onSubmit={handleSubmit}>
				<Input label="Company Name" keyName="company" placeholder="Company Name" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Position Title" keyName="position" placeholder="Position" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Description" keyName="description" placeholder="Role Description" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Start Date" keyName="startDate" placeholder="" onChange={onChange} setState={setState} currState={currState} />
				<Input label="End Date" keyName="endDate" placeholder="" onChange={onChange} setState={setState} currState={currState} />
				<button className='submit-btn' type="submit">Submit</button>
			</form>
		</div>
	);
}
