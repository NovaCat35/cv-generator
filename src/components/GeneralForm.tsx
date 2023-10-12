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
				<Input label='Full Name' keyName='name' placeholder='First and Last Name' onChange={onChange} setState={setState} currState={currState}/>
				<Input label='Email' keyName='email' placeholder='Email' onChange={onChange} setState={setState} currState={currState}/>
				<Input label='Telephone' keyName='phone' placeholder='Phone Number' onChange={onChange} setState={setState} currState={currState}/>
			</form>
		</div>
	);
}

