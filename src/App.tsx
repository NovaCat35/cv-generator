import { useState } from "react";
import GeneralForm from "./components/GeneralForm.tsx";
import ResumePreview from "./components/ResumePreview.tsx";
import EducationForm from "./components/EducationForm.tsx";
import ExperienceForm from "./components/ExperienceForm.tsx";
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
	startDate: string;
	endDate?: string;
}

export interface ExperienceItem {
	company: string;
	position: string;
	location: string;
	description: string;
	startDate: string;
	endDate?: string;
}
export interface Experience extends Array<ExperienceItem> {}

export interface HandleChange {
	e: React.ChangeEvent<HTMLInputElement>;
	keyName: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
}

export interface HandleListChange {
	setState: React.Dispatch<React.SetStateAction<any>>;
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
		school: "Amestrian, State Military",
		study: "State Alchemist",
		startDate: "October 1911",
		endDate: "August 1917",
	});

	const [experience, setExperience] = useState<Experience>([
		{
			company: "Aperture Science",
			position: "Research Assistant",
			location: 'USA',
			description: "Contributed to groundbreaking research projects at Aperture Science, specializing in lunar gel studies. Conducted experiments, analyzed samples, and collaborated with a team of scientists. Played a key role in advancing our understanding of extraterrestrial materials, supporting the organization's mission in pioneering space technology.",
			startDate: "09/1975",
			endDate: "04/1980",
		},
		{ 
			company: "Adventure Guide", 
			position: "Adventurer", 
			location: 'Teyvat',
			description: "Contributed to groundbreaking research projects at Aperture Science, specializing in lunar gel studies. Conducted experiments, analyzed samples, and collaborated with a team of scientists. Played a key role in advancing our understanding of extraterrestrial materials, supporting the organization's mission in pioneering space technology.", 
			startDate: "09/1975", 
			endDate: "04/1980" 
		},
	]);

	const [isPreviewActive, setIsPreviewActive] = useState(false);

	/**
	 * This handleChange function covers the dynamic inputs from each component 'Forms'.
	 * The setState and currState is the parameters unique to each form component that.
	 * This way we can change the different states without having to create multiple handleChange for each 'form' component.
	 * */
	const handleChange = ({ e, keyName, setState, currState }: HandleChange) => {
		setState({ ...currState, [keyName]: e.target.value });
	};
	/**
	 * handleCollectionList keeps track of a list of exp or skills added by form submits
	 * While the individual 'forms'.tsx handle the adding of individual elements, we need to append them all here
	 * */
	const setCollectionList = ({ setState, currState, newElement }: HandleListChange) => {
		setState([...currState, newElement]);
	};

	return (
		<>
			<div className={isPreviewActive ? "main-forms-container hidden" : "main-forms-container"}>
				<GeneralForm onChange={handleChange} currState={person} setState={setPerson} />
				<EducationForm onChange={handleChange} currState={education} setState={setEducation} />
				<ExperienceForm handleSubmitChange={setCollectionList} currState={experience} setState={setExperience} />
			</div>
			<div className="resume-preview">
				<ResumePreview personInfo={person} educationInfo={education} experienceInfo={experience} />
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
