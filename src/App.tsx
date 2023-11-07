import { useEffect, useState } from "react";
import { ColorContext } from "./contexts/ColorContext.ts";
import GeneralForm from "./components/GeneralForm.tsx";
import ResumePreview from "./components/ResumePreview.tsx";
import EducationForm from "./components/EducationForm.tsx";
import ExperienceForm from "./components/ExperienceForm.tsx";
import SkillForm from "./components/SkillForm.tsx";
import AdditionalForm from "./components/AdditionalForm.tsx";
import PrintComponent from "./components/PrintOption.tsx";
import CustomButton from "./components/CustomButton.tsx";
import MainIcon from "./components/MainIcon.tsx";
import Customization from "./components/Customization.tsx";
import "./styles/App.scss";
import "./styles/mainForms.scss";
import "./styles/resumePreview.scss";
import "./styles/expandBtns.scss";
import visibleImg from "./assets/visibility.svg";
import visibleImgOff from "./assets/visibility_off.svg";
import { initialPersonState, initialEducationState, initialSkillHeadersState, initialSkillsState, initialExperienceState, initialExpBulletPtsState, initialAdditionalInfoState, initialSamplePerson, initialSampleEducation, initialSampleSkillHeaders, initialSampleSkills, initialSampleExperience, initialSampleExpBulletPts, initialSampleAdditionalInfo } from "./scripts/InitialStates.tsx";

export interface Person {
	name: string;
	email: string;
	phone: string;
	location: string;
	website: string;
}

export interface Education {
	school: string;
	study: string;
	location: string;
	startDate: string;
	endDate?: string;
}

export interface SkillHeader {
	id: string;
	header: string;
}
export interface SkillItem {
	id: string;
	headerId: string;
	skill: string;
}

// --- Experience ---
export interface ExperienceBulletPts {
	id: string;
	headerId: string;
	bulletPoint: string;
}
export interface ExperienceItem {
	id: string;
	company: string;
	position: string;
	location: string;
	description: string;
	startDate: string;
	endDate: string;
}
export interface Experience extends Array<ExperienceItem> {}

// --Additional Info
export interface BulletPoint {
	id: string;
	subHeaderId: string;
	bulletPoint: string;
}
export interface SubHeader {
	id: string;
	categoryId: string;
	headerName: string;
	bulletPointIds: string[];
}
export interface Category {
	id: string;
	header: string;
}
export interface AdditionalInfo {
	categories: Category[];
	subHeaders: SubHeader[];
	bulletPoints: BulletPoint[];
}

// -- HANDLE function interfaces --
export interface HandleChange {
	value: string;
	keyName: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
}

export interface HandleListChange {
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
	newElement: any;
}

export interface HandleListRemove {
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
	targetId: string;
	typeId?: string;
}

export interface HandleAdditionalInfoUpdate {
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: AdditionalInfo;
	targetId: string;
	newElement: any;
}

function App() {
	// Retrieve data from localStorage
	const storedPerson = JSON.parse(localStorage.getItem("person") || "null") as Person;
	const storedEducation = JSON.parse(localStorage.getItem("education") || "null") as Education;
	const storedSkillHeaders = JSON.parse(localStorage.getItem("skillHeaders") || "null") as SkillHeader[];
	const storedSkills = JSON.parse(localStorage.getItem("skills") || "null") as SkillItem[];
	const storedExperience = JSON.parse(localStorage.getItem("experience") || "null") as Experience;
	const storedExpBulletPts = JSON.parse(localStorage.getItem("expBulletPts") || "null") as ExperienceBulletPts[];
	const storedAdditionalInfo = JSON.parse(localStorage.getItem("additionalInfo") || "null") as AdditionalInfo;
	const storedColorName = JSON.parse(localStorage.getItem("colorName") || "null");
	const storedColorHeader = JSON.parse(localStorage.getItem("colorHeader") || "null");
	const storedColorSubheader = JSON.parse(localStorage.getItem("colorSubheader") || "null");

	const [person, setPerson] = useState<Person>(storedPerson || initialSamplePerson);
	const [education, setEducation] = useState<Education>(storedEducation || initialSampleEducation);
	const [skillHeaders, setSkillHeaders] = useState<SkillHeader[]>(storedSkillHeaders || initialSampleSkillHeaders);
	const [skills, setSkills] = useState<SkillItem[]>(storedSkills || initialSampleSkills);
	const [experience, setExperience] = useState<Experience>(storedExperience || initialSampleExperience);
	const [expBulletPts, setExpBulletPts] = useState<ExperienceBulletPts[]>(storedExpBulletPts || initialSampleExpBulletPts);
	const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>(storedAdditionalInfo || initialSampleAdditionalInfo);

	const [isPreviewActive, setIsPreviewActive] = useState(false); // keeps state of a preview button for smaller screens
	const [activeIndex, setActiveIndex] = useState(0); // This is for keeping track of active expanded forms

	const [colorName, setColorName] = useState<string>(storedColorName || "#105581"); // Color info used for Context API
	const [colorHeader, setColorHeader] = useState<string>(storedColorHeader || "#105581");
	const [colorSubheader, setColorSubheader] = useState<string>(storedColorSubheader || "#105581");

	/**
	 * While the setState and currState is the parameters unique to each 'form' component, this function is made for reusability.
	 * Thus, we can change the different states without having to create multiple handleChange for each 'form' component.
	 * */
	const handleChange = ({ value, keyName, setState, currState }: HandleChange) => {
		setState({ ...currState, [keyName]: value });
	};

	/**
	 * The handleCollectionList updates the currState list by adding the new object by form submits
	 * While the individual 'forms'.tsx handle the adding of individual elements, we need to update the state here with the submitted Info
	 * */
	const updateInfoList = ({ setState, currState, newElement }: HandleListChange) => {
		let foundId = false;
		// Map through the current state to find and update the object with matching id
		const updatedState = currState.map((item: any) => {
			if (item.id == newElement.id) {
				foundId = true;
				return newElement;
			}
			return item;
		});
		// If no matching id was found, add the newElement to the state
		if (!foundId) {
			updatedState.push(newElement);
		}
		// Set the updated state
		setState(updatedState);
	};

	/**
	 * We handle all header and subchild of header here (e.g. skillHeader and individual skills)
	 * First we remove all instance of subchild related to header and just add the new changes from subchilds
	 */
	const updateHeaderCategoryList = ({ setState, currState, newElement }: HandleListChange) => {
		// Map through the current state any remove all matching newElement[0]'s headerId
		const updatedState = currState.filter((item: any) => item.headerId !== newElement[0].headerId);
		const newState = [...updatedState, ...newElement];
		// Set the updated state
		setState(newState);
	};

	/**
	 * Because I didn't separate the collapse additionalInfo into separate states for bulletPts (playing around with my code here), I made a new function just to deal with additionalInfo
	 */
	const updateAdditionalInfo = ({ setState, currState, targetId, newElement }: HandleAdditionalInfoUpdate) => {
		// Remove elements with the specified targetId (Clean slate)
		const updatedCategories = currState.categories.filter((item) => item.id !== targetId);
		const updatedSubHeaders = currState.subHeaders.filter((item) => item.categoryId !== targetId);
		const updatedBulletPoints = currState.bulletPoints.filter((item) => {
			const subHeader = currState.subHeaders.find((subHeader) => subHeader.id === item.subHeaderId);
			return subHeader && subHeader.categoryId !== targetId;
		});

		// Add new elements to the lists
		updatedCategories.push({ id: newElement.id, header: newElement.categoryName });
		updatedSubHeaders.push(...newElement.subHeaders);
		updatedBulletPoints.push(...newElement.bulletPoints);

		// Set the updated state
		setState((prevState: AdditionalInfo) => ({
			...prevState,
			categories: updatedCategories,
			subHeaders: updatedSubHeaders,
			bulletPoints: updatedBulletPoints,
		}));
	};

	/**
	 * @param targetId
	 * Targets the id for main header objects and the headerId targets the subsequence bullet lists.
	 * Special case for categoryId, addtionalInfo's bullet list is within the object (not collapsed) needs to remove main header, subheader, and bullet points
	 */
	const removeIDFromList = ({ setState, currState, targetId, typeId = "id" }: HandleListRemove) => {
		let filterList;
		if (typeId === "categoryId") {
			const updatedCategories = currState["categories"].filter((item: any) => item.id !== targetId);
			const updatedSubHeaders = currState["subHeaders"].filter((item: any) => item.categoryId !== targetId);
			const updatedBulletPoints = currState["bulletPoints"].filter((item: any) => {
				// For every item, we check to find the subHeader that matches its subHeaderId, then we can use that subHeader.categoryId to match & ignore targetID
				const subHeader = currState["subHeaders"].find((subHeader: any) => subHeader.id === item.subHeaderId);
				return subHeader && subHeader.categoryId !== targetId;
			});
			setState({ ...currState, categories: updatedCategories, subHeaders: updatedSubHeaders, bulletPoints: updatedBulletPoints });
			return;
		} else if (typeId === "headerId") {
			filterList = currState.filter((item: any) => item.headerId !== targetId);
		} else {
			filterList = currState.filter((item: any) => item.id !== targetId);
		}
		setState(filterList);
	};

	const clearAll = () => {
		setPerson(initialPersonState);
		setEducation(initialEducationState);
		setSkillHeaders(initialSkillHeadersState);
		setSkills(initialSkillsState);
		setExperience(initialExperienceState);
		setExpBulletPts(initialExpBulletPtsState);
		setAdditionalInfo(initialAdditionalInfoState);
	};

	const resetSample = () => {
		setPerson(initialSamplePerson);
		setEducation(initialSampleEducation);
		setSkillHeaders(initialSampleSkillHeaders);
		setSkills(initialSampleSkills);
		setExperience(initialSampleExperience);
		setExpBulletPts(initialSampleExpBulletPts);
		setAdditionalInfo(initialSampleAdditionalInfo);
		setColorName("#105581");
		setColorHeader("#105581");
		setColorSubheader("#105581");
	};

	useEffect(() => {
		// Save data to localStorage whenever the state changes
		localStorage.setItem("person", JSON.stringify(person));
		localStorage.setItem("education", JSON.stringify(education));
		localStorage.setItem("skillHeaders", JSON.stringify(skillHeaders));
		localStorage.setItem("skills", JSON.stringify(skills));
		localStorage.setItem("experience", JSON.stringify(experience));
		localStorage.setItem("expBulletPts", JSON.stringify(expBulletPts));
		localStorage.setItem("additionalInfo", JSON.stringify(additionalInfo));
	}, [person, education, skillHeaders, skills, experience, expBulletPts, additionalInfo]);

	useEffect(() => {
		// Save data to localStorage whenever the state changes
		localStorage.setItem("colorName", JSON.stringify(colorName));
		localStorage.setItem("colorHeader", JSON.stringify(colorHeader));
		localStorage.setItem("colorSubheader", JSON.stringify(colorSubheader));
	}, [colorName, colorHeader, colorSubheader]);

	return (
		<>
			<ColorContext.Provider value={{ colorName, colorHeader, colorSubheader, setColorName, setColorHeader, setColorSubheader }}>
				<div className={isPreviewActive ? "main-forms-container hidden" : "main-forms-container"}>
					<h1 className="title">MY CV Generator</h1>
					<div className="toolkit-container">
						<PrintComponent personInfo={person} educationInfo={education} skillHeaderInfo={skillHeaders} skillListInfo={skills} experienceInfo={experience} expBulletPoints={expBulletPts} additionalInfo={additionalInfo} />
						<CustomButton nameType={"clear"} handleClick={clearAll} />
						<CustomButton nameType={"sample"} handleClick={resetSample} />
					</div>
					<Customization isActive={activeIndex === 5} onExpand={(param) => setActiveIndex(param)} />
					<div className="note-container">
						<MainIcon />
						<p>All changes are saved locally. Click on the left image for more info.</p>
					</div>
					<div className="divider"></div>
					<GeneralForm isActive={activeIndex === 0} onExpand={(param) => setActiveIndex(param)} onChange={handleChange} currState={person} setState={setPerson} />
					<EducationForm isActive={activeIndex === 1} onExpand={(param) => setActiveIndex(param)} onChange={handleChange} currState={education} setState={setEducation} />
					<SkillForm isActive={activeIndex === 2} onExpand={(param) => setActiveIndex(param)} handleSubmitHeader={updateInfoList} handleSubmitList={updateHeaderCategoryList} handleRemoveChange={removeIDFromList} currStateHeader={skillHeaders} currStateItem={skills} setStateHeader={setSkillHeaders} setStateSkills={setSkills} />
					<ExperienceForm isActive={activeIndex === 3} onExpand={(param) => setActiveIndex(param)} handleSubmitHeader={updateInfoList} handleSubmitList={updateHeaderCategoryList} handleRemoveChange={removeIDFromList} currStateExp={experience} currStateBulletPts={expBulletPts} setStateExp={setExperience} setStateBulletPts={setExpBulletPts} />
					<AdditionalForm isActive={activeIndex === 4} onExpand={(param) => setActiveIndex(param)} currState={additionalInfo} setState={setAdditionalInfo} handleRemoveChange={removeIDFromList} handleSubmitCategory={updateAdditionalInfo} />
				</div>
				<div className="resume-preview">
					<ResumePreview personInfo={person} educationInfo={education} skillHeaderInfo={skillHeaders} skillListInfo={skills} experienceInfo={experience} expBulletPoints={expBulletPts} additionalInfo={additionalInfo} />
				</div>
			</ColorContext.Provider>
			<button
				className={isPreviewActive ? "previewBtn active" : "previewBtn"}
				onClick={() => {
					if (isPreviewActive) {
						setIsPreviewActive(false);
					} else {
						setIsPreviewActive(true);
					}
				}}
			>
				<img src={isPreviewActive ? visibleImgOff : visibleImg} alt="preview-btn" />
			</button>
		</>
	);
}

export default App;
