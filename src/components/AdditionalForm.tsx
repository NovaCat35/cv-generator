import { useState } from "react";
import { Input } from "./Input.tsx";
import { HandleChange, AdditionalInfo, HandleListRemove } from "../App.tsx";
import Header from "./Header.tsx";
import FormButtons from "./FormButtons.tsx";
import CardList from "./CardList.tsx";
import InputCards from "./InputCards.tsx";
import ErrorText from "./ErrorText.tsx";
import BannerOptions from "./BannerOptions.tsx";
import infoSvg from "../assets/info.svg";

interface AdditionalFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	currState: AdditionalInfo;
	setState: React.Dispatch<React.SetStateAction<any>>;
   handleRemoveChange: (date: HandleListRemove) => void;
}

export default function AdditionalForm({ isActive, onExpand, currState, setState, handleRemoveChange }: AdditionalFormProps) {
	const initInfo = {
		category: "",
		subHeaders: [],
		bulletPoints: [],
	};
	const [currInfo, setCurrInfo] = useState(initInfo);
	const [showForm, setShowForm] = useState(false);

	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(4);
	};

   // Because we can't change the resume directly and must wait for the form to submit, we can only change the current exp
	const onChangeInfo = ({ value, keyName }: HandleChange) => {
		setCurrInfo({ ...currInfo, [keyName]: value });
	};

	const handleSubmit = () => {
		return;
	};

	const handleSeeExpClick = (e: React.MouseEvent<HTMLDivElement>) => {
		// const targetId = e.currentTarget.getAttribute("id");
		// // Repopulate currExp base on information from currState if the ID match
		// const [targetObject] = currState.filter((exp) => exp.id == targetId);
		// setCurrExp({ ...targetObject });

		// // Repopulate the bulletPts of the selected experience base on targetID
		// const targetBulletPts = currStateBulletPts.filter((bulletPt) => bulletPt.headerId == targetId);
		// console.log(targetBulletPts);
		// setCurrBulletPtList(targetBulletPts);

		// // Setup toggle btn to be checked or not
		// if (targetObject.endDate != "Present") {
		// 	setIsChecked(false);
		// } else {
		// 	setIsChecked(true);
		// }
		setShowForm(true);
	};
	const handleAddExpClick = () => {
		setShowForm(true);
	};

	const removeInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		const targetID = (e.currentTarget.parentNode as HTMLElement).getAttribute("id");
		/**
		 * Typescript getting type error, saying 'getAttribute('id') can return a string or null.'
		 * Thus, I need to explicitly check if targetID is not null
		 * */
		if (targetID !== null) {
			handleRemoveChange({ setState: setState, currState: currState, targetId: targetID, typeId: 'categoryId' });
		} else {
			console.error("Error: Target ID is null.");
		}
	};

	return (
		<div className={isActive ? "form-container active" : "form-container"}>
			<Header name="Other Info" isActive={isActive} handleExpandClick={handleExpandClick} imgSrc={infoSvg} />
			{showForm ? (
				<form onSubmit={handleSubmit}>
					<Input label="Category Name" keyName="company" placeholder="Company Name" onChange={onChangeInfo} setState={setState} currState={currState} propValue={initInfo.category} required={true} />
					<Input label="Subheader Name" keyName="position" placeholder="Position" onChange={onChangeInfo} setState={setState} currState={currState} propValue={initInfo.subHeaders[0]} required={true} />

					{/* <CardList currList={currBulletPtList} mainName="experience" handleRemoveCard={removeBulletCard} />
					<InputCards type="experience" currState={currBulletPt} onChange={onChangeBulletPt} onAddToList={onAddBulletPtToList} />
					{errorMessage && <ErrorText errorMessage={errorMessage} alertStatus={errorAlert} setAlert={(status) => setErrorAlert(status)} />}

					<FormButtons handleCancelClick={handleCancelClick} /> */}
				</form>
			) : (
				<BannerOptions mainName="info-container" type="additionalInfo" currState={currState["categories"]} handleSeeBanner={handleSeeExpClick} handleAddClick={handleAddExpClick} handleRemoveClick={removeInfo} />
			)}
		</div>
	);
}
