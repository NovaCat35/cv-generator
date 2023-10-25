import { useState } from "react";
import Header from "./Header.tsx";
import { HandleListChange, SkillHeader, SkillItem, HandleListRemove, HandleChange } from "../App.tsx";
import BannerOptions from "./BannerOptions.tsx";
import { Input } from "./Input.tsx";
import FormButtons from './FormButtons.tsx'
import CardList from './CardList.tsx'
import InputCards from './InputCards.tsx'
import { v4 as uuidv4 } from "uuid";

interface SkillFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	handleSubmitHeader: (data: HandleListChange) => void;
	handleSubmitList: (data: HandleListChange) => void;
	handleRemoveChange: (targetId: HandleListRemove) => void;
	currStateHeader: SkillHeader[];
	currStateItem: SkillItem[];
	setStateHeader: React.Dispatch<React.SetStateAction<any>>;
	setStateSkills: React.Dispatch<React.SetStateAction<any>>;
}

export default function SkillForm({ isActive, onExpand, handleSubmitHeader, handleSubmitList, handleRemoveChange, currStateHeader, currStateItem, setStateHeader, setStateSkills }: SkillFormProps) {
	const initHeader: SkillHeader = { id: uuidv4(), header: "" };
	const initSkillList: SkillItem[] = [];
	const initSkill: SkillItem = { id: "", headerId: "", skill: "" };
	const [currSkillHeader, setCurrSkillHeader] = useState(initHeader);
	const [currSkillsList, setCurrSkillsList] = useState(initSkillList);
	const [currSkill, setCurrSkill] = useState(initSkill);
	const [showForm, setShowForm] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");


	// Handles the expand/collapse btns by setting the curr index to expand on or -1 to collapse
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(1);
	};

	const onChangeHeader = ({ value, keyName }: HandleChange) => {
		setCurrSkillHeader({ ...currSkillHeader, [keyName]: value });
	};

	// Changes the currSkill only, not finalize though. We still need to add it to list
	const onChangeSkill = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setCurrSkill({ ...currSkill, skill: newValue });
	};
	// On adding a new skill to our currSkillsList, we initialize only the id of the skill, then we can add the new skill back to the list
	const onAddSkillToList = () => {
		const newSkillItem: SkillItem = {
			headerId: currSkillHeader.id,
			id: uuidv4(),
			skill: currSkill.skill,
		};

		if(newSkillItem.skill != "") {
			setCurrSkillsList([...currSkillsList, newSkillItem]);
			setCurrSkill(initSkill);
			setErrorMessage(""); // RESETS empty skill error if applicable		
		} else {
			setErrorMessage("You can't add an empty skill!")
		}	
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newHeader = { ...currSkillHeader };
		handleSubmitHeader({ setState: setStateHeader, currState: currStateHeader, newElement: newHeader });

		if(currSkillsList.length > 0) {
			handleSubmitList({ setState: setStateSkills, currState: currStateItem, newElement: currSkillsList });
			resetInit();
			setShowForm(false);
		} else {
			setErrorMessage("Please add a skill!")
		}
	};

	const removeSkillCard = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		if (targetID !== null) {
			const newSkillList = currSkillsList.filter(skill => skill.id != targetID)
			setCurrSkillsList(newSkillList);
		} else {
			console.error("Error: Target ID is null.");
		}
	};


	const handleCancelClick = () => {
		resetInit();
		setShowForm(false);
	};

	/**
	 * The 'handle clicks' functions below controls what is showing on the MAIN Banner page
	 */
	const handleAddSkillClick = () => {
		setShowForm(true);
		setCurrSkill(initSkill); // reset input value
	};

	// This function brings up the form and shows all skills item and header base on targetID
	const handleSeeSkillClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetId = e.currentTarget.getAttribute("id");
		const [targetHeader] = currStateHeader.filter((header) => header.id == targetId);
		setCurrSkillHeader({ ...targetHeader });
		// Use the same targetId to find all matching headerID in our currStateItem
		const targetSkills = currStateItem.filter((skill) => skill.headerId == targetId);
		setCurrSkillsList(targetSkills);

		setCurrSkill(initSkill); // reset
		setShowForm(true);
	};

	const removeSkillBanner = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		if (targetID !== null) {
			handleRemoveChange({ setState: setStateHeader, currState: currStateHeader, targetId: targetID, typeId:'id' });
			handleRemoveChange({ setState: setStateSkills, currState: currStateItem, targetId: targetID, typeId:'headerId' });
		} else {
			console.error("Error: Target ID is null.");
		}
	};

	function resetInit() {
		setCurrSkillHeader(initHeader); 
		setCurrSkillsList(initSkillList);
		setCurrSkill(initSkill);
		setErrorMessage("");
	}

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Skills" isActive={isActive} handleExpandClick={handleExpandClick} />
			{showForm ? (
				<div className="main-skill-container">
					<CardList currList={currSkillsList} mainName="skill" handleRemoveCard={removeSkillCard} />
					<form className="skill-input-container" onSubmit={handleSubmit}>
						<Input label="Skill Category" keyName="header" placeholder="Title" onChange={onChangeHeader} setState={setCurrSkillHeader} currState={currSkillHeader} propValue={currSkillHeader.header} required={true} />

						<InputCards type='skill' currState={currSkill} onChange={onChangeSkill} onAddToList={onAddSkillToList}/>
						{errorMessage && <div className="error"> {errorMessage} </div>}

						<FormButtons handleCancelClick={handleCancelClick}/>
					</form>
				</div>
			) : (
				<BannerOptions mainName="skill-opt-container" type="skill" currState={currStateHeader} handleSeeBanner={handleSeeSkillClick} handleAddClick={handleAddSkillClick} handleRemoveClick={removeSkillBanner} />
			)}
		</div>
	);
}
