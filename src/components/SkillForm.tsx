import { SetStateAction, useState } from "react";
import Header from "./Header.tsx";
import { HandleListChange, SkillHeader, SkillItem, HandleListRemove, HandleChange } from "../App.tsx";
import BannerOptions from "./BannerOptions.tsx";
import { Input } from "./Input.tsx";
import CloseSVG from "../assets/close.svg";
import AddSVG from "../assets/add.svg";
import { v4 as uuidv4 } from "uuid";

interface SkillFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	handleSubmitChange: (data: HandleListChange) => void;
	handleRemoveChange: (targetId: HandleListRemove) => void;
	currStateHeader: SkillHeader[];
	currStateItem: SkillItem[];
	setStateHeader: React.Dispatch<React.SetStateAction<any>>;
	setStateSkills: React.Dispatch<React.SetStateAction<any>>;
}

export default function SkillForm({ isActive, onExpand, handleSubmitChange, handleRemoveChange, currStateHeader, currStateItem, setStateHeader, setStateSkills }: SkillFormProps) {
	const initHeader: SkillHeader = { id: "", header: uuidv4() };
	const initSkillList: SkillItem[] = [];
	const initSkill:SkillItem = { id: "", headerId: "", skill: "" };
	const [currSkillHeader, setCurrSkillHeader] = useState(initHeader);
	const [currSkillsList, setCurrSkillsList] = useState(initSkillList);
	const [currSkill, setCurrSkill] = useState(initSkill);
	const [showForm, setShowForm] = useState(false);

	// Handles the expand/collapse btns by setting the curr index to expand on or -1 to collapse
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(1);
	};

	const onChangeHeader = ({ value, keyName }: HandleChange) => {
		setCurrSkillHeader({ ...currSkillHeader, [keyName]: value });
	};

	// Changes the currSkill only, we don't initialize the ID and headerID until we decide to submit 
	const onChangeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setCurrSkill({ ...currSkill, skill: newValue });
	};
	// On adding a new skill to our currSkillsList, we initialize only the id of the skill, then we can add the new skill back to the list
	const onAddSkillToList = () => {
		const newSkillItem: SkillItem = {
			id: uuidv4(),
			headerId: currSkillHeader.id,
			skill: currSkill.skill 
		 };
	  
		setCurrSkillsList([...currSkillsList, newSkillItem]);
		setCurrSkill(initSkill);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setShowForm(false);
		const newElement = { ...currSkillsList, id: uuidv4() };
		// handleSubmitChange({ setState, currStateHeader, newElement });
		setCurrSkill(initSkill); //reset
	};

	const removeSkill = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		if (targetID !== null) {
			// handleRemoveChange({setState, currStateHeader, targetId:targetID});
		} else {
			console.error("Error: Target ID is null.");
		}
	};

	/**
	 * The 'handle clicks' functions below controls what is showing, either the main form or the exp-infos
	 */
	const handleCancelClick = () => {
		setCurrSkill(initSkill);
		setShowForm(false);
	};
	const handleAddSkillClick = () => {
		setCurrSkill(initSkill);
		setShowForm(true);
	};

	// This function brings up the form and shows all skills item and header base on targetID
	const handleSeeSkillClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetId = e.currentTarget.getAttribute("id");
		const [targetHeader] = currStateHeader.filter((header) => header.id == targetId);
		setCurrSkillHeader({ ...targetHeader });
		// Use the same targetId to find all matching headerID in our currStateItem
		const targetSkills = currStateItem.filter((skill) => skill.headerId == targetId);

		setCurrSkillsList([...currSkillsList, ...targetSkills]);

		setShowForm(true);
	};

	const removeSkillHeader = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		/**
		 * Typescript getting type error, saying 'getAttribute('id') can return a string or null.'
		 * Thus, I need to explicitly check if targetID is not null
		 * */
		if (targetID !== null) {
			handleRemoveChange({ setState: setStateHeader, currState: currStateHeader, targetId: targetID });
		} else {
			console.error("Error: Target ID is null.");
		}
	};

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Skills" isActive={isActive} handleExpandClick={handleExpandClick} />
			{showForm ? (
				<div className="main-skill-container">
					{/* Add individual skills down below */}
					<div className="skill-list-container">
						{currSkillsList.map((item) => (
							<div className="skill-details" id={item.id} key={item.id}>
								<div>{item.skill}</div>
								<button className="closeBtn" onClick={removeSkill}>
									<img src={CloseSVG} alt="close button" />
								</button>
							</div>
						))}
					</div>
					<form className="skill-input-container" onSubmit={handleSubmit}> 
						<Input label="Skill Category" keyName="skill" placeholder="Title" onChange={onChangeHeader} setState={setCurrSkillHeader} currState={currSkillHeader} propValue={currSkillHeader.header}/>

						<div className="add-skill-input-container">
							<input type="text" placeholder="Add Skill" onChange={onChangeSkill} value={currSkill.skill} required />
							<button className='addBtn' type="button" onClick={onAddSkillToList}><img src={AddSVG} alt="add button img" /></button>
						</div>
						<button className='submitBtn' type="submit">Add Category</button>
					</form>
				</div>
			) : (
				<BannerOptions mainName="skill-opt-container" type="skill" currState={currStateHeader} handleSeeBanner={handleSeeSkillClick} handleAddClick={handleAddSkillClick} handleRemoveClick={removeSkillHeader} />
			)}
		</div>
	);
}
