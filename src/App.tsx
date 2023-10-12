import { useState } from "react";
import GeneralForm from "./components/GeneralForm.tsx";
import ResumePreview from "./components/ResumePreview.tsx";
import "./App.css";

export interface Person {
	name: string;
	email: string;
	phone: string;
}


function App() {
	const [person, setPerson] = useState<Person>({
		name: "Edward Elric",
		email: "edward.elric@gmail.com",
		phone: "(202) 456-1111",
	});



	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
		setPerson({ ...person, [fieldName]: e.target.value });
	};

	return (
		<>
			<div className="main-forms-container">
				<GeneralForm personInfo={person} onChange={handleChange} />
			</div>
			<div className="resume-preview">
				<ResumePreview personInfo={person} />
			</div>
		</>
	);
}

export default App;
