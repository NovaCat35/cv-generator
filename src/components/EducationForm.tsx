import Input from "./Input.tsx";
import {Education, HandleChange} from '../App.tsx';

interface EducationFormProps {
   onChange: (data: HandleChange) => void;
	currState: Education;
	setState: React.Dispatch<React.SetStateAction<any>>;
}

export default function EducationForm({ onChange, setState, currState }: EducationFormProps) {
   return (
		<div className="form-container">
			<form action="">
				<Input label='School' keyName='school' placeholder='Amestrian, State Military' onChange={onChange} setState={setState} currState={currState}/>
				<Input label='Degree | Study' keyName='study' placeholder='State Alchemist' onChange={onChange} setState={setState} currState={currState}/>
				<Input label='Start Date' keyName='startDate' placeholder='October 1911' onChange={onChange} setState={setState} currState={currState}/>
				<Input label='End Date' keyName='endDate' placeholder='August 1917' onChange={onChange} setState={setState} currState={currState}/>
			</form>
		</div>
   )
}