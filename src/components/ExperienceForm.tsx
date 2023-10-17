import {Input} from "./Input.tsx";
import { HandleListChange, Experience, HandleChange } from "../App.tsx";
import { useState } from "react";
import {InputDate} from "./InputDate.tsx";
import DisableDate from "./DisableDate.tsx";
import ExpandSVG from "../assets/expand.svg";


interface ExperienceFormProps {
	isActive: boolean;
	onExpand: () => void;
	handleSubmitChange: (data: HandleListChange) => void;
	currState: Experience;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function ExperienceForm({ isActive, onExpand, handleSubmitChange, setState, currState }: ExperienceFormProps) {
	const [currExp, setCurrExp] = useState({
		company: '',
		position: '',
		location: '',
		description: '',
		startDate: '',
		endDate: '',
	});
	const [isChecked, setIsChecked] = useState(false);

	const onChange = ({value, keyName} : HandleChange) => {
		setCurrExp({...currExp, [keyName] : value})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const updatedEndDate = isChecked ? 'Present' : currExp.endDate;
		const newElement = {...currExp, endDate : updatedEndDate}
		handleSubmitChange({setState, currState, newElement});
	}

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
	}

	return (
		<div className={isActive ? 'form-container active' : 'form-container'}>
			<div className="head">
				<h1>Experience</h1>
				<button className={isActive ? 'expandBtn active' : 'expandBtn'} onClick={onExpand}><img src={ExpandSVG} alt="expand icon"/></button>
			</div>
			<form onSubmit={handleSubmit}>
				<Input label="Company Name" keyName="company" placeholder="Company Name" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Position Title" keyName="position" placeholder="Position" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Description" keyName="description" placeholder="Role Description" onChange={onChange} setState={setState} currState={currState} />
				<DisableDate onToggle={handleToggle}/>
				<InputDate label="Start Date *" keyName="startDate" onChange={onChange} setState={setState} currState={currState} />
				{isChecked ? '' : <InputDate label="End Date *" keyName="endDate" onChange={onChange} setState={setState} currState={currState} /> }
				<button className='submit-btn' type="submit">Submit</button>
			</form>
		</div>
	);
}
