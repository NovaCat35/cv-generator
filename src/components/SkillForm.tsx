import { useState } from "react";
import Header from "./Header.tsx";
import { HandleListChange, Skills, HandleListRemove, HandleChange } from "../App.tsx";
import CloseSVG from "../assets/close.svg";
import { v4 as uuidv4 } from "uuid";

interface SkillFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	handleSubmitChange: (data: HandleListChange) => void;
	handleRemoveChange: (targetId: HandleListRemove) => void;
	currState: Skills;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function SkillForm({ isActive, onExpand, handleSubmitChange, handleRemoveChange, setState, currState }: SkillFormProps) {
	const initSkill = { id: "", skill: "" };
	const [currSkill, setCurrSkill] = useState(initSkill);

	// Handles the expand/collapse btns by setting the curr index to expand on or -1 to collapse
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(1);
	};

	// Because we can't change the resume directly and must wait for the form to submit, we can only change the current exp
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setCurrSkill({ ...currSkill, skill: newValue });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newElement = { ...currSkill, id: uuidv4() };
		handleSubmitChange({ setState, currState, newElement });
      setCurrSkill(initSkill); //reset
	};

   const removeSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute('id');
		if (targetID !== null) {
			handleRemoveChange({setState, currState, targetId:targetID});
	  } else {
			console.error('Error: Target ID is null.');
	  }
	}

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Skills" isActive={isActive} handleExpandClick={handleExpandClick} />
			<div className="main-skill-container">
				{/* Add individual skills down below */}
				<div className="skill-list-container">
               {currState.map(item => (
                  <div className='skill-details' id={item.id} >
                     <div>{item.skill}</div>
							<button className="closeBtn" onClick={removeSkill}><img src={CloseSVG} alt="close button"/></button>
                  </div>
               ))}
            </div>
				<form className="skill-input-container" onSubmit={handleSubmit}>
					<input type="text" placeholder='Add Skill' onChange={handleChange} value={currSkill.skill} required />
					<button type="submit">Add</button>
				</form>
			</div>
		</div>
	);
}
