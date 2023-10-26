import {Input} from "./Input.tsx";
import { HandleChange, Person } from "../App.tsx";
import Header from "./Header.tsx";
import profileSvg from "../assets/profile.svg";

interface GeneralFormProps {
	isActive: boolean;
	onExpand: (param: number) => void;
	onChange: (data: HandleChange) => void;
	currState: Person;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function GeneralForm({ isActive, onExpand, onChange, currState, setState }: GeneralFormProps) {
	// HandleExpand checks if the current container is already active, if so we close, otherwise we open
	const handleExpandClick = () => {
		isActive ? onExpand(-1) : onExpand(0);
	};

	return (
			<div className={isActive ? "form-container active" : "form-container"}>
				<Header name="Profile" isActive={isActive} handleExpandClick={handleExpandClick} imgSrc={profileSvg}/>
				<form action="">
					<Input label="Full Name" keyName="name" placeholder="First and Last Name" onChange={onChange} setState={setState} currState={currState} />
					<Input label="Email" keyName="email" placeholder="Email" onChange={onChange} setState={setState} currState={currState} />
					<Input label="Telephone" keyName="phone" placeholder="Phone Number" onChange={onChange} setState={setState} currState={currState} />
					<Input label="Location" keyName="location" placeholder="Location" onChange={onChange} setState={setState} currState={currState} />
					<Input label="Website" keyName="website" placeholder="Personal Website" onChange={onChange} setState={setState} currState={currState} />
				</form>
			</div>
	);
}
