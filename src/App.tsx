import { useState } from "react";
import GeneralForm from "./components/GeneralForm.tsx";
import ResumePreview from "./components/ResumePreview.tsx";
import EducationForm from "./components/EducationForm.tsx";
import ExperienceForm from "./components/ExperienceForm.tsx";
import SkillForm from "./components/SkillForm.tsx";
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

export interface SkillItem {
	id: string;
	skill: string;
}
export interface Skills extends Array<SkillItem> {}

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

export interface HandleChange {
	value: string;
	keyName: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
}

export interface HandleListChange {
	setState: React.Dispatch<React.SetStateAction<Experience>>;
	currState: Experience;
	newElement: ExperienceItem;
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
		startDate: "Sept 1911",
		endDate: "May 1917",
	});

	const [skills, setSkills] = useState<Skills>([
		{id: 'nova789', skill: 'Transmutation'}, 
		{id:'efg456', skill:'Biology'}, 
		{id:'han23', skill:'Alchemy'},
	])

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
	 * The handleCollectionList keeps track of a list of exp or skills added by form submits
	 * While the individual 'forms'.tsx handle the adding of individual elements, we need to update the state here with the submitted Info
	 * */
	const updateInfoList = ({ setState, currState, newElement }: HandleListChange) => {
		let foundId = false;
		// Map through the current state to find and update the object with matching id
		const updatedState = currState.map((exp) => {
			if (exp.id == newElement.id) {
				foundId = true;
				return newElement; // Update the matching object
			}
			return exp; // Keep other objects unchanged
		});
		// If no matching id was found, add the newElement to the state
		if (!foundId) {
			updatedState.push(newElement);
		}
		// Set the updated state
		setState(updatedState);
	};

	/**
	 * @param targetId 
	 * Targets the experience and skills setState so that we can remove specific elements base on ID
	 */
	const removeIDFromList = (targetId: string) => {
		const filterExpList = experience.filter((exp) => exp.id !== targetId);
		setExperience(filterExpList);
	};
	

	return (
		<>
			<div className={isPreviewActive ? "main-forms-container hidden" : "main-forms-container"}>
				<GeneralForm onChange={handleChange} currState={person} setState={setPerson} />
				<EducationForm isActive={activeIndex === 0} onExpand={(param) => setActiveIndex(param)} onChange={handleChange} currState={education} setState={setEducation} />
				<SkillForm isActive={activeIndex === 1} onExpand={(param) => setActiveIndex(param)} handleSubmitChange={updateInfoList} handleRemoveChange={removeIDFromList} currState={skills} setState={setSkills} />
				<ExperienceForm isActive={activeIndex === 2} onExpand={(param) => setActiveIndex(param)} handleSubmitChange={updateInfoList} handleRemoveChange={removeIDFromList} currState={experience} setState={setExperience} />
			</div>
			<div className="resume-preview">
				<ResumePreview personInfo={person} educationInfo={education} skillInfo={skills} experienceInfo={experience} />
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
