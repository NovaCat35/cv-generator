import { useState } from "react";
import { Input } from "./Input.tsx";
import { HandleListChange, Experience, ExperienceItem, HandleChange } from "../App.tsx";
import { InputDate } from "./InputDate.tsx";
import DisableDate from "./DisableDate.tsx";
import Header from './Header.tsx'
import CloseSVG from "../assets/close.svg"
import { v4 as uuidv4 } from 'uuid';

interface ExperienceFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	handleSubmitChange: (data: HandleListChange) => void;
	handleRemoveChange: (targetId: string) => void;
	currState: Experience;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function ExperienceForm({ isActive, onExpand, handleSubmitChange, handleRemoveChange, setState, currState }: ExperienceFormProps) {
	const initialExpState = {
		id: "",
		company: "",
		position: "",
		location: "",
		description: "",
		startDate: "",
		endDate: "",
  };
	const [currExp, setCurrExp] = useState(initialExpState);
	const [isChecked, setIsChecked] = useState(false);
	const [showForm, setShowForm] = useState(false);

	const onChange = ({ value, keyName }: HandleChange) => {
		setCurrExp({ ...currExp, [keyName]: value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowForm(false);

		// Change endDate and ID here because these information is now finalize at time of submission 
		const updatedEndDate = isChecked ? "Present" : currExp.endDate;
		const updatedID = (currExp.id != '') ? currExp.id : uuidv4();
		const newElement = { ...currExp, endDate: updatedEndDate, id: updatedID};
		handleSubmitChange({ setState, currState, newElement });
	};

	// Checkbox toggle handler for showing endDate container or not
	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
	};
	// Handles the expand/collapse btns by collapsing current component if already active, otherwise expand!
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(2);
	};

	/**
	 * The 'handle clicks' functions below controls what is showing, either the main form or the exp-infos
	 */
	const handleCancelClick = () => {
		setCurrExp(initialExpState);
		setShowForm(false);
	};
	const handleAddExpClick = () => {
		setCurrExp(initialExpState);
		setShowForm(true);
	};
	const handleSeeExpClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetId = e.currentTarget.getAttribute('id');
		// Repopulate currExp base on information from currState if the ID match
		const [targetObject] = currState.filter(exp => exp.id == targetId);
		setCurrExp({...targetObject});

		// Setup toggle btn to be checked or not
		if(targetObject.endDate != 'Present') {
			setIsChecked(false)
		} else {
			setIsChecked(true)
		}
		setShowForm(true);
	};

	// Remove experience from the currState
	const removeExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute('id');
		/**
		 * Typescript getting type error, saying 'getAttribute('id') can return a string or null.'
		 * Thus, I need to explicitly check if targetID is not null 
		 * */ 
		if (targetID !== null) {
			handleRemoveChange(targetID);
	  } else {
			console.error('Error: Target ID is null.');
	  }
	}

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name='Experience' isActive={isActive} handleExpandClick={handleExpandClick}/>
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
					{/* Populates the main exp-container with the individual exp stored in currState*/}
					{currState.map((experience: ExperienceItem, index: number) => (
						<div className={`exp-details`} id={experience.id} key={experience.id} onClick={handleSeeExpClick}>
							<div>{experience.company}</div>
							<button className="closeBtn" onClick={removeExperience}><img src={CloseSVG} alt="close button"/></button>
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
