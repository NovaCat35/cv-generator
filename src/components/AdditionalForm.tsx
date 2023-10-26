import { useState } from "react";
import {Input} from "./Input.tsx";
import { HandleChange, AdditionalInfo } from "../App.tsx";
import Header from "./Header.tsx";
import BannerOptions from "./BannerOptions.tsx";
import infoSvg from "../assets/info.svg";


interface AdditionalFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	currState: AdditionalInfo;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function AdditionalForm({isActive, onExpand, currState, setState} : AdditionalFormProps) {
   const [showForm, setShowForm] = useState(false);

	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(4);
	};

   // const handleSeeExpClick = (e: React.MouseEvent<HTMLDivElement>) => {
	// 	const targetId = e.currentTarget.getAttribute("id");
	// 	// Repopulate currExp base on information from currState if the ID match
	// 	const [targetObject] = currStateExp.filter((exp) => exp.id == targetId);
	// 	setCurrExp({ ...targetObject });

	// 	// Repopulate the bulletPts of the selected experience base on targetID
	// 	const targetBulletPts = currStateBulletPts.filter((bulletPt) => bulletPt.headerId == targetId);
	// 	console.log(targetBulletPts);
	// 	setCurrBulletPtList(targetBulletPts);

	// 	// Setup toggle btn to be checked or not
	// 	if (targetObject.endDate != "Present") {
	// 		setIsChecked(false);
	// 	} else {
	// 		setIsChecked(true);
	// 	}
	// 	setShowForm(true);
	// };

   const handleSubmit = () => {
      return;
   }

   return (
      <div className={isActive ? "form-container active" : "form-container"}>
         <Header name="Additional Info" isActive={isActive} handleExpandClick={handleExpandClick} imgSrc={infoSvg}/>
         {showForm ? (
				<form onSubmit={handleSubmit}>
					{/* <Input label="Company Name" keyName="company" placeholder="Company Name" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} propValue={currExp.company} required={true} />
					<Input label="Position Title" keyName="position" placeholder="Position" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} propValue={currExp.position} required={true} />
					<Input label="Description" keyName="description" placeholder="Role Description" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} propValue={currExp.description} />
					<DisableDate onToggle={handleToggle} checked={isChecked} />
					<InputDate label="Start Date *" keyName="startDate" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} dateValue={currExp.startDate} />
					{isChecked ? "" : <InputDate label="End Date *" keyName="endDate" onChange={onChangeExp} setState={setStateExp} currState={currStateExp} dateValue={currExp.endDate} />}

					<CardList currList={currBulletPtList} mainName="experience" handleRemoveCard={removeBulletCard} />
					<InputCards type="experience" currState={currBulletPt} onChange={onChangeBulletPt} onAddToList={onAddBulletPtToList} />
					{errorMessage && <ErrorText errorMessage={errorMessage} alertStatus={errorAlert} setAlert={(status) => setErrorAlert(status)} />}

					<FormButtons handleCancelClick={handleCancelClick} /> */}
				</form>
			) : (
            <div></div>
				// <BannerOptions mainName="extra-info-opt-container" type="additionalInfo" currState={currState} handleSeeBanner={handleSeeExpClick} handleAddClick={handleAddExpClick} handleRemoveClick={removeExperience} />
			)}
      </div>
   )
}