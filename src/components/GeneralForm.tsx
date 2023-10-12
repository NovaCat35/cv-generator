import Input from "./Input.tsx";
import {HandleChange, Person} from '../App.tsx'

interface GeneralFormProps {
   onChange: (data: HandleChange) => void;
	currState: Person;
	setState: React.Dispatch<React.SetStateAction<any>>;
}
 

export default function GeneralForm({ onChange, currState, setState }: GeneralFormProps) {
	return (
		<div className="form-container">
			<form action="">
				<Input label='Full Name' keyName='name' placeholder='Edward Elric' onChange={onChange} setState={setState} currState={currState}/>
				<Input label='Email' keyName='email' placeholder='edward.elric@gmail.com' onChange={onChange} setState={setState} currState={currState}/>
				<Input label='Telephone' keyName='phone' placeholder='(202) 456-1111' onChange={onChange} setState={setState} currState={currState}/>
			</form>
		</div>
	);
}

