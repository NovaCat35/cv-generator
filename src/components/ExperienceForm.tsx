import { useState } from "react";
import { Input } from "./Input.tsx";
import { HandleListChange, HandleListRemove, Experience, ExperienceBulletPts, HandleChange } from "../App.tsx";
import { InputDate } from "./InputDate.tsx";
import BannerOptions from "./BannerOptions.tsx";
import DisableDate from "./DisableDate.tsx";
import Header from "./Header.tsx";
import FormButtons from "./FormButtons.tsx";
import CardList from "./CardList.tsx";
import InputCards from "./InputCards.tsx";
import ErrorText from "./ErrorText.tsx";
import expSvg from "../assets/experience.svg";

import { v4 as uuidv4 } from "uuid";

interface ExperienceFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	handleSubmitHeader: (data: HandleListChange) => void;
	handleSubmitList: (data: HandleListChange) => void;
	handleRemoveChange: (date: HandleListRemove) => void;
	currStateExp: Experience;
	currStateBulletPts: ExperienceBulletPts[];
	setStateExp: React.Dispatch<React.SetStateAction<any>>;
	setStateBulletPts: React.Dispatch<React.SetStateAction<any>>;
}

export default function ExperienceForm({ isActive, onExpand, handleSubmitHeader, handleSubmitList, handleRemoveChange, currStateExp, currStateBulletPts, setStateExp, setStateBulletPts }: ExperienceFormProps) {
	const initialExpState = {
		id: uuidv4(),
		company: "",
		position: "",
		location: "",
		description: "",
		startDate: "",
		endDate: "",
	};
	const initBulletPoint = {
		id: "",
		headerId: "",
		bulletPoint: "",
	};
	const initBulletsList: ExperienceBulletPts[] = [];

	const [currExp, setCurrExp] = useState(initialExpState);
	const [currBulletPt, setCurrBulletPt] = useState(initBulletPoint);
	const [currBulletPtList, setCurrBulletPtList] = useState(initBulletsList);
	const [isChecked, setIsChecked] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorAlert, setErrorAlert] = useState(false);

	// Because we can't change the resume directly and must wait for the form to submit, we can only change the current exp
	const onChangeExp = ({ value, keyName }: HandleChange) => {
		setCurrExp({ ...currExp, [keyName]: value });
	};

	const onChangeBulletPt = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setCurrBulletPt({ ...currBulletPt, bulletPoint: newValue });
	};

	const onAddBulletPtToList = () => {
		const newBulletPt: ExperienceBulletPts = {
			id: uuidv4(),
			headerId: currExp.id,
			bulletPoint: currBulletPt.bulletPoint,
		};

		if (newBulletPt.bulletPoint != "") {
			setCurrBulletPtList([...currBulletPtList, newBulletPt]);
			// Reset below, we don't use resetInit since we don't want to reset entire form info
			setCurrBulletPt(initBulletPoint);
			setErrorMessage("");
		} else {
			setErrorMessage("Can't add an empty bullet points!");
			setErrorAlert(true);
		}
	};

	const removeBulletCard = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		if (targetID !== null) {
			const newSkillList = currBulletPtList.filter((bullet) => bullet.id != targetID);
			setCurrBulletPtList(newSkillList);
		} else {
			console.error("Error: Target ID is null.");
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Change endDate and ID here(if non-existing) because these information is now finalize at time of submission
		const updatedEndDate = isChecked ? "Present" : currExp.endDate;
		const updatedID = currExp.id != "" ? currExp.id : uuidv4();
		const newElement = { ...currExp, endDate: updatedEndDate, id: updatedID };
		handleSubmitHeader({ setState: setStateExp, currState: currStateExp, newElement });

		if (currBulletPtList.length > 0) {
			handleSubmitList({ setState: setStateBulletPts, currState: currStateBulletPts, newElement: currBulletPtList });
			resetInit();
			setShowForm(false);
		} else {
			setErrorMessage("Please add a skill!");
			setErrorAlert(true);
		}
	};

	// Checkbox toggle handler for showing endDate container or not
	const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
	};
	// Handles the expand/collapse btns by collapsing current component if already active, otherwise expand!
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(3);
	};

	/**
	 * ResetInit takes care of Cancel and Adding new Exp clicks
	 */
	const handleCancelClick = () => {
		resetInit();
		setShowForm(false);
	};
	const handleAddExpClick = () => {
		setShowForm(true);
	};
	const resetInit = () => {
		setCurrBulletPtList(initBulletsList);
		setCurrBulletPt(initBulletPoint);
		setCurrExp(initialExpState);
		setErrorMessage("");
	};

	const handleSeeExpClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const targetId = e.currentTarget.getAttribute("id");
		// Repopulate currExp base on information from currState if the ID match
		const [targetObject] = currStateExp.filter((exp) => exp.id == targetId);
		setCurrExp({ ...targetObject });

		// Repopulate the bulletPts of the selected experience base on targetID
		const targetBulletPts = currStateBulletPts.filter((bulletPt) => bulletPt.headerId == targetId);
		console.log(targetBulletPts);
		setCurrBulletPtList(targetBulletPts);

		// Setup toggle btn to be checked or not
		if (targetObject.endDate != "Present") {
			setIsChecked(false);
		} else {
			setIsChecked(true);
		}
		setShowForm(true);
	};

	// Remove experience from the currState, this will impact the main App and Resume output
	const removeExperience = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		/**
		 * Typescript getting type error, saying 'getAttribute('id') can return a string or null.'
		 * Thus, I need to explicitly check if targetID is not null
		 * */
		if (targetID !== null) {
			handleRemoveChange({ setState: setStateExp, currState: currStateExp, targetId: targetID });
		} else {
			console.error("Error: Target ID is null.");
		}
	};

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Experience" isActive={isActive} handleExpandClick={handleExpandClick} imgSrc={expSvg}/>
			{showForm ? (
				<form onSubmit={handleSubmit}>
					<Input label="Company Name" keyName="company" placeholder="Company Name" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} propValue={currExp.company} required={true} />
					<Input label="Position Title" keyName="position" placeholder="Position" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} propValue={currExp.position} required={true} />
					<Input label="Description" keyName="description" placeholder="Role Description" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} propValue={currExp.description} />
					<DisableDate onToggle={handleToggle} checked={isChecked} />
					<InputDate label="Start Date *" keyName="startDate" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} dateValue={currExp.startDate} />
					{isChecked ? "" : <InputDate label="End Date *" keyName="endDate" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} dateValue={currExp.endDate} />}

					<CardList currList={currBulletPtList} mainName="experience" handleRemoveCard={removeBulletCard} />
					<InputCards type="experience" currState={currBulletPt} onChange={onChangeBulletPt} onAddToList={onAddBulletPtToList} />
					{errorMessage && <ErrorText errorMessage={errorMessage} alertStatus={errorAlert} setAlert={(status) => setErrorAlert(status)} />}

					<FormButtons handleCancelClick={handleCancelClick} />
				</form>
			) : (
				<BannerOptions mainName="exp-opt-container" type="experience" currState={currStateExp} handleSeeBanner={handleSeeExpClick} handleAddClick={handleAddExpClick} handleRemoveClick={removeExperience} />
			)}
		</div>
	);
}
