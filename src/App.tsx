import { useState } from "react";
import GeneralForm from "./components/GeneralForm.tsx";
import ResumePreview from "./components/ResumePreview.tsx";
import EducationForm from "./components/EducationForm.tsx";
import ExperienceForm from "./components/ExperienceForm.tsx";
import SkillForm from "./components/SkillForm.tsx";
import AdditionalForm from "./components/AdditionalForm.tsx";
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
interface BulletPoint {
	id: string;
	subHeaderId: string;
	bulletPoint: string;
 }
 interface SubHeader {
	id: string;
	categoryId: string;
	name: string;
	bulletPointIds: string[];
 }
 interface Category {
	id: string;
	name: string;
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
		{ id: "han23", headerId: "header1", skill: "alchemy mastery" },
		{ id: "abc456", headerId: "header1", skill: "metal manipulation" },
		{ id: "metal321", headerId: "header1", skill: "metal bending" },
		{ id: "head23", headerId: "header2", skill: "climbing" },
		{ id: "sans23", headerId: "header2", skill: "swimming" },
		{ id: "did89", headerId: "header2", skill: "fighting" },
		{ id: "magic234", headerId: "header2", skill: "spell casting" },
		{ id: "stealth678", headerId: "header2", skill: "stealth" },
		{ id: "leadership432", headerId: "header2", skill: "leadership" },
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
		categories: [
			{ id: "123", name: "Personal Projects" },
			{ id: "456", name: "Testing" },
		],
		subHeaders: [
			{ id: "pwa", categoryId: "123", name:'Forbidden Knowledge', bulletPointIds: ['hol3', 'fed'] },
			{ id: "234d", categoryId: "123", name:'Growth Alchemy', bulletPointIds: ['see3', 'asdf'] },
			{ id: "2df", categoryId: "456", name:'Growth Alchemy', bulletPointIds: ['see3', 'asdf'] },
		],
		bulletPoints: [
			{ id: "hol3", subHeaderId: "pwa", bulletPoint: "Did a thing" },
			{ id: "fed", subHeaderId: "pwa", bulletPoint: "Did others stuff" },
			{ id: "see3", subHeaderId: "234d", bulletPoint: "heh, not here..." },
			{ id: "asdf", subHeaderId: "2df", bulletPoint: "HEy no peaking" },
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
		// Map through the current state any delete(reset) all matching newElement[0]'s headerId
		const updatedState = currState.filter((item: any) => item.headerId !== newElement[0].headerId);
		const newState = [...updatedState, ...newElement];
		// Set the updated state
		setState(newState);
	};

	/**
	 * @param targetId
	 * Targets the id\headerId setState so that we can remove specific elements base on targetID
	 */
	const removeIDFromList = ({ setState, currState, targetId, typeId = "id" }: HandleListRemove) => {
		const filterList = typeId == "headerId" ? currState.filter((item: any) => item.headerId !== targetId) : currState.filter((item: any) => item.id !== targetId);
		setState(filterList);
	};

	return (
		<>
			<div className={isPreviewActive ? "main-forms-container hidden" : "main-forms-container"}>
				<h1 className="title">MY CV Generator</h1>
				<GeneralForm isActive={activeIndex === 0} onExpand={(param) => setActiveIndex(param)} onChange={handleChange} currState={person} setState={setPerson} />
				<EducationForm isActive={activeIndex === 1} onExpand={(param) => setActiveIndex(param)} onChange={handleChange} currState={education} setState={setEducation} />
				<SkillForm isActive={activeIndex === 2} onExpand={(param) => setActiveIndex(param)} handleSubmitHeader={updateInfoList} handleSubmitList={updateHeaderCategoryList} handleRemoveChange={removeIDFromList} currStateHeader={skillHeaders} currStateItem={skills} setStateHeader={setSkillHeaders} setStateSkills={setSkills} />
				<ExperienceForm isActive={activeIndex === 3} onExpand={(param) => setActiveIndex(param)} handleSubmitHeader={updateInfoList} handleSubmitList={updateHeaderCategoryList} handleRemoveChange={removeIDFromList} currStateExp={experience} currStateBulletPts={expBulletPts} setStateExp={setExperience} setStateBulletPts={setExpBulletPts} />
				<AdditionalForm isActive={activeIndex === 4} onExpand={(param) => setActiveIndex(param)} currState={additionalInfo} setState={setActiveIndex} />
			</div>
			<div className="resume-preview">
				<ResumePreview personInfo={person} educationInfo={education} skillHeaderInfo={skillHeaders} skillListInfo={skills} experienceInfo={experience} expBulletPoints={expBulletPts} additionalInfo={additionalInfo}/>
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
