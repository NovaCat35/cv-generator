import { useState } from "react";
import GeneralForm from "./components/GeneralForm.tsx";
import ResumePreview from "./components/ResumePreview.tsx";
import EducationForm from "./components/EducationForm.tsx";
import ExperienceForm from "./components/ExperienceForm.tsx";
import SkillForm from "./components/SkillForm.tsx";
import AdditionalForm from "./components/AdditionalForm.tsx";
import PrintComponent from "./components/PrintOption.tsx";
import "./styles/App.scss";
import "./styles/mainForms.scss";
import "./styles/resumePreview.scss";
import "./styles/expandBtns.scss";
import visibleImg from "./assets/visibility.svg";
import visibleImgOff from "./assets/visibility_off.svg";

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
	const [person, setPerson] = useState<Person>({
		name: "Edward Elric",
		email: "edward.elric@gmail.com",
		phone: "(202) 456-1111",
		location: "Resembool, Amestris",
		website: "linkedin.com/in/edwardelric",
	});

	const [education, setEducation] = useState<Education>({
		school: "Amestrian State Military",
		location: "Amestris, Central City",
		study: "Master of State Alchemy",
		startDate: "Oct 1911",
		endDate: "May 1913",
	});

	const [skillHeaders, setSkillHeaders] = useState<SkillHeader[]>([
		{ id: "header1", header: "Scientific Disciplines" },
		{ id: "header2", header: "Adventure Expertise" },
	]);
	const [skills, setSkills] = useState<SkillItem[]>([
		{ id: "nova789", headerId: "header1", skill: "transmutation" },
		{ id: "efg456", headerId: "header1", skill: "biology" },
		{ id: "han23", headerId: "header1", skill: "alchemic mastery" },
		{ id: "abc456", headerId: "header1", skill: "elemental manipulation" },
		{ id: "head23", headerId: "header2", skill: "survival instincts" },
		{ id: "sans23", headerId: "header2", skill: "swimming" },
		{ id: "did89", headerId: "header2", skill: "physical combat" },
		{ id: "magic234", headerId: "header2", skill: "tracking" },
		{ id: "stealth678", headerId: "header2", skill: "stealth" },
		{ id: "leadership432", headerId: "header2", skill: "adaptability" },
	]);

	const [experience, setExperience] = useState<Experience>([
		{
			id: "abc123",
			company: "Aperture Science, Inc.",
			position: "Research Assistant",
			location: "USA",
			description: "Contributed invaluable insights to the development of cutting-edge technologies, most notably the revolutionary portal gun.",
			startDate: "Aug 1957",
			endDate: "April 1970",
		},
		{
			id: "pwd888",
			company: "Amestrian State Military",
			position: "State Alchemist",
			location: "Amestris, Central City",
			description: "Utilized alchemical expertise and innovative problem-solving to investigate and resolve complex alchemical mysteries. Demonstrated exceptional skill in both theoretical and practical alchemy, ensuring the safety and security of Amestris through pioneering advancements in alchemical techniques.",
			startDate: "Sept 1911",
			endDate: "May 1917",
		},
	]);
	const [expBulletPts, setExpBulletPts] = useState<ExperienceBulletPts[]>([
		{
			id: "bullet1",
			headerId: "abc123",
			bulletPoint: "Conducted extensive research on quantum mechanics and theoretical physics to support the development of innovative technologies.",
		},
		{
			id: "bullet2",
			headerId: "abc123",
			bulletPoint: "Collaborated with a multidisciplinary team of scientists and engineers to solve complex scientific challenges related to portal technology.",
		},
		{
			id: "b3ll3t3",
			headerId: "pwd888",
			bulletPoint: "Investigated and resolved intricate alchemical mysteries, utilizing a deep understanding of alchemical principles and techniques to uncover hidden truths and solve complex problems.",
		},
		{
			id: "bullet4",
			headerId: "pwd888",
			bulletPoint: "Actively participated in intelligence missions, employing alchemical skills to decrypt codes, decipher ancient texts, and gain insights into the enemy's alchemical capabilities.",
		},
		{
			id: "bu5et5",
			headerId: "pwd888",
			bulletPoint: "Conducted public demonstrations and educational outreach programs to raise awareness about alchemy, its applications, and its ethical use, promoting understanding and cooperation within the community.",
		},
	]);

	const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>({
		categories: [{ id: "cat1", header: "Personal Projects" }],
		subHeaders: [
			{ id: "sub1", categoryId: "cat1", headerName: "Alchemy Mastery: Philosopher's Stone Revelation", bulletPointIds: ["hol3", "fed"] },
			{ id: "sub2", categoryId: "cat1", headerName: "Automail Revolution: Enhanced Prosthetics", bulletPointIds: ["see3"] },
		],
		bulletPoints: [
			{ id: "hol3", subHeaderId: "sub1", bulletPoint: "Researched ancient alchemical manuscripts and decoded complex symbols, advancing the understanding of Philosopher's Stone synthesis." },
			{ id: "fed", subHeaderId: "sub1", bulletPoint: "Developed a groundbreaking technique for Philosopher's Stone synthesis, demonstrating expertise in advanced alchemy." },
			{ id: "see3", subHeaderId: "sub2", bulletPoint: "Worked closely with renowned automail expert Winry Rockbell, contributing expertise in alchemical principles to improve compatibility and integration with the human body." },
		],
	});

	const [isPreviewActive, setIsPreviewActive] = useState(false); // keeps state of a preview button for smaller screens
	const [activeIndex, setActiveIndex] = useState(0); // This is for keeping track of active expanded forms

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
				return newElement; // Update the matching object
			}
			return item; // Keep other objects unchanged
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
	

	return (
		<>
			<div className={isPreviewActive ? "main-forms-container hidden" : "main-forms-container"}>
				<h1 className="title">MY CV Generator</h1>
				<PrintComponent personInfo={person} educationInfo={education} skillHeaderInfo={skillHeaders} skillListInfo={skills} experienceInfo={experience} expBulletPoints={expBulletPts} additionalInfo={additionalInfo}/>
				<GeneralForm isActive={activeIndex === 0} onExpand={(param) => setActiveIndex(param)} onChange={handleChange} currState={person} setState={setPerson} />
				<EducationForm isActive={activeIndex === 1} onExpand={(param) => setActiveIndex(param)} onChange={handleChange} currState={education} setState={setEducation} />
				<SkillForm isActive={activeIndex === 2} onExpand={(param) => setActiveIndex(param)} handleSubmitHeader={updateInfoList} handleSubmitList={updateHeaderCategoryList} handleRemoveChange={removeIDFromList} currStateHeader={skillHeaders} currStateItem={skills} setStateHeader={setSkillHeaders} setStateSkills={setSkills} />
				<ExperienceForm isActive={activeIndex === 3} onExpand={(param) => setActiveIndex(param)} handleSubmitHeader={updateInfoList} handleSubmitList={updateHeaderCategoryList} handleRemoveChange={removeIDFromList} currStateExp={experience} currStateBulletPts={expBulletPts} setStateExp={setExperience} setStateBulletPts={setExpBulletPts} />
				<AdditionalForm isActive={activeIndex === 4} onExpand={(param) => setActiveIndex(param)} currState={additionalInfo} setState={setAdditionalInfo} handleRemoveChange={removeIDFromList} handleSubmitCategory={updateAdditionalInfo} />
			</div>
			<div className="resume-preview">
				<ResumePreview personInfo={person} educationInfo={education} skillHeaderInfo={skillHeaders} skillListInfo={skills} experienceInfo={experience} expBulletPoints={expBulletPts} additionalInfo={additionalInfo} />
			</div>
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
