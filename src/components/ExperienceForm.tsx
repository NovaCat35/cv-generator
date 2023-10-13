import Input from "./Input.tsx";
import { Experience, HandleChange } from "../App.tsx";

interface ExperienceFormProps {
	onChange: (data: HandleChange) => void;
	currState: Experience;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function ExperienceForm({ onChange, setState, currState }: ExperienceFormProps) {
	return (
		<div className="form-container">
			<h1>Experience</h1>
			<form action="">
				<Input label="Company Name" keyName="company" placeholder="Company Name" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Position Title" keyName="position" placeholder="Position" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Description" keyName="description" placeholder="Role Description" onChange={onChange} setState={setState} currState={currState} />
				<Input label="Start Date" keyName="startDate" placeholder="" onChange={onChange} setState={setState} currState={currState} />
				<Input label="End Date" keyName="endDate" placeholder="" onChange={onChange} setState={setState} currState={currState} />
			</form>
		</div>
	);
}
