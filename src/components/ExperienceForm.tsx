import { Input } from "./Input.tsx";
import { HandleListChange, Experience, ExperienceItem, HandleChange } from "../App.tsx";
import { useState } from "react";
import { InputDate } from "./InputDate.tsx";
import DisableDate from "./DisableDate.tsx";
import ExpandSVG from "../assets/expand.svg";
import { v4 as uuidv4 } from 'uuid';

interface ExperienceFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	handleSubmitChange: (data: HandleListChange) => void;
	currState: Experience;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function ExperienceForm({ isActive, onExpand, handleSubmitChange, setState, currState }: ExperienceFormProps) {
	const [currExp, setCurrExp] = useState({
		id: "",
		company: "",
		position: "",
		location: "",
		description: "",
		startDate: "",
		endDate: "",
	});
	const [isChecked, setIsChecked] = useState(false);
	const [showForm, setShowForm] = useState(false);

	const onChange = ({ value, keyName }: HandleChange) => {
		setCurrExp({ ...currExp, [keyName]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowForm(false);
		const updatedEndDate = isChecked ? "Present" : currExp.endDate;
		const newElement = { ...currExp, endDate: updatedEndDate, id: uuidv4()};
		handleSubmitChange({ setState, currState, newElement });
	};

	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
	};

	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(1);
	};
	/**
	 * The 'handle clicks' functions below controls what is showing, either the main form or the exp-infos
	 */
	const handleCancelClick = () => {
		setShowForm(false);
	};
	const handleAddExpClick = () => {
		setShowForm(true);
	};
	const handleSeeExpClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const targetId = e.currentTarget.getAttribute('id');
		// Setup the currExp to copy over the object from targetId in currState
		const [targetObject] = currState.filter(exp => exp.id == targetId);
		setCurrExp({...targetObject});

		// Setup toggle btns and dates
		console.log(targetObject.endDate)
		if(targetObject.endDate != 'Present') {
			setIsChecked(false)
		} else {
			setIsChecked(true)
		}
		setShowForm(true);
	};

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<div className="head">
				<h1>Experience</h1>
				<button className={isActive ? "expandBtn active" : "expandBtn"} onClick={handleExpandClick}>
					<img src={ExpandSVG} alt="expand icon" />
				</button>
			</div>
			{showForm ? (
				<form onSubmit={handleSubmit}>
					<Input label="Company Name" keyName="company" placeholder="Company Name" onChange={onChange} setState={setState} currState={currState} propValue={currExp.company}/>
					<Input label="Position Title" keyName="position" placeholder="Position" onChange={onChange} setState={setState} currState={currState} propValue={currExp.position}/>
					<Input label="Description" keyName="description" placeholder="Role Description" onChange={onChange} setState={setState} currState={currState} propValue={currExp.description}/>
					<DisableDate onToggle={handleToggle} checked={isChecked}/>
					<InputDate label="Start Date *" keyName="startDate" onChange={onChange} setState={setState} currState={currState} dateValue={currExp.startDate}/>
					{isChecked ? "" : <InputDate label="End Date *" keyName="endDate" onChange={onChange} setState={setState} currState={currState} dateValue={currExp.endDate}/>}
					<div className="button-container">
						<button className="cancel-btn" type="button" onClick={handleCancelClick}>
							Cancel
						</button>
						<button className="submit-btn" type="submit">
							Submit
						</button>
					</div>
				</form>
			) : (
				<div className="exp-opt-container">
					{currState.map((experience: ExperienceItem, index: number) => (
						<div className={`exp-details`} id={experience.id} key={experience.id} onClick={handleSeeExpClick}>
							<div>{experience.company}</div>
						</div>
					))}
					<div className="button-container">
						<button type="button" onClick={handleAddExpClick}>Add Experience</button>
					</div>
				</div>
			)}
		</div>
	);
}
