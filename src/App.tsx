import { useState } from "react";
import GeneralForm from "./components/GeneralForm.tsx";
import ResumePreview from "./components/ResumePreview.tsx";
import EducationForm from "./components/EducationForm.tsx";
import "./styles/App.css";

export interface Person {
	name: string;
	email: string;
	phone: string;
}

export interface Education {
	school: string;
	study: string;
	startDate: string;
	endDate?: string;
}

export interface HandleChange {
	e: React.ChangeEvent<HTMLInputElement>;
	fieldName: string;
	setState: React.Dispatch<React.SetStateAction<any>>;
	currState: any;
}

function App() {
	const [person, setPerson] = useState<Person>({
		name: "Edward Elric",
		email: "edward.elric@gmail.com",
		phone: "(202) 456-1111",
	});

	const [education, setEducation] = useState<Education>({
		school: "Amestrian, State Military",
		study: "State Alchemist",
		startDate: "October 1911",
		endDate: "August 1917",
	});

	/**
	 * This handleChange function covers the dynamic inputs from each component 'Forms'.
	 * The setState and currState is the parameters unique to each form component that. 
	 * This way we can change the different states without having to create multiple handleChange for each 'form' component.
	 * */ 
	const handleChange = ({ e, fieldName, setState, currState }: HandleChange) => {
		console.log(setState)
		setState({ ...currState, [fieldName]: e.target.value });
	};

	return (
		<>
			<div className="main-forms-container">
				<GeneralForm onChange={handleChange} currState={person} setState={setPerson} />
				<EducationForm onChange={handleChange} currState={education} setState={setEducation}/>
			</div>
			<div className="resume-preview">
				<ResumePreview personInfo={person} educationInfo={education} />
			</div>
		</>
	);
}

export default App;